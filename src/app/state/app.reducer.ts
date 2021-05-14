import { createReducer, on } from '@ngrx/store';
import { DEFAULT_NETWORKS, NETWORK_FEES_PC } from 'src/app/data/currency-settings';
import { Networks, NetworkSymbols } from '../data/currency-settings';
import { UtilService } from '../services/util.service';
import * as AppActions from './app.actions';
import { AppAuthMessages, AppDropdownState, AppModalStates, AppTransactionCurrencies } from './app.enums';
import { IAmount, ITransaction, IUser } from './app.model';

export interface AppState {
  user: IUser | undefined;
  registrationErrorMessage: string;
  loginErrorMessage: string;
  modalState: AppModalStates;
  isNavbarVisible: boolean;
  emailConsent: boolean;
  rememberMe: boolean;
  dropdownState: AppDropdownState;
  activeDropdownOptions: { [AppDropdownState: string]: string }[];
  transactions: ITransaction[];
  activeTransaction: ITransaction | undefined;
  creatorItems: IAmount;
  purchasorItems: IAmount;
}

const initialState: AppState = {
  registrationErrorMessage: '',
  loginErrorMessage: '',
  user: undefined,
  modalState: AppModalStates.Closed,
  isNavbarVisible: false,
  emailConsent: false,
  rememberMe: false,
  dropdownState: AppDropdownState.Hidden,
  activeDropdownOptions: [],
  transactions: [],
  activeTransaction: undefined,
  creatorItems: {
    currency: AppTransactionCurrencies.GEMS,
    units: 1000,
    receivingWallet: {
      network: Networks.BTC,
      networkSymbol: NetworkSymbols.BTC,
      walletAddress: '',
      veveUsername: '',
    },
    sendingWallet: {
      network: Networks.VEVE,
      networkSymbol: NetworkSymbols.VEVE,
      walletAddress: '',
      veveUsername: '',
    },
    fees: {
      networkFees: NETWORK_FEES_PC[AppTransactionCurrencies.BTC][0].fee,
      platformFees: 0.125 * 0.05,
      totalPostFees:
        0.0125 * 0.95 - NETWORK_FEES_PC[AppTransactionCurrencies.BTC][0].fee,
    },
  },
  purchasorItems: {
    username: '',
    useruid: '',
    currency: AppTransactionCurrencies.BTC,
    units: 0.0125,
    receivingWallet: {
      network: Networks.VEVE,
      networkSymbol: NetworkSymbols.VEVE,
      walletAddress: '',
      veveUsername: '',
    },
    sendingWallet: {
      network: Networks.BTC,
      networkSymbol: NetworkSymbols.BTC,
      walletAddress: '',
      veveUsername: '',
    },
    fees: {
      networkFees: NETWORK_FEES_PC[AppTransactionCurrencies.GEMS][0].fee,
      platformFees: 1000 * 0.05,
      totalPostFees:
        1000 * 0.95 - NETWORK_FEES_PC[AppTransactionCurrencies.GEMS][0].fee,
    },
  },
};

export const appReducer = createReducer<AppState>(
  initialState,
  on(AppActions.credentialsRegistrationFailure, (state, props): AppState => {
    return { ...state, registrationErrorMessage: props.error.message };
  }),

  on(AppActions.credentialsLoginFailure, (state, props): AppState => {
    return { ...state, loginErrorMessage: props.error.message };
  }),

  on(AppActions.resetSignupError, (state): AppState => {
    return { ...state, registrationErrorMessage: '' };
  }),

  on(AppActions.resetLoginError, (state): AppState => {
    return { ...state, loginErrorMessage: '' };
  }),

  on(AppActions.showModal, (state, props): AppState => {
    return {
      ...state,
      modalState: props.modalState,
      dropdownState: AppDropdownState.Hidden,
      loginErrorMessage: '',
      registrationErrorMessage: '',
    };
  }),

  on(AppActions.toggleDropdown, (state, props): AppState => {
    return {
      ...state,
      dropdownState:
        props.dropdownState === state.dropdownState
          ? AppDropdownState.Hidden
          : props.dropdownState,
    };
  }),

  on(AppActions.setDropdownOption, (state, props): AppState => {
    const array = Object.assign([], state.activeDropdownOptions) as {
      [AppDropdownState: string]: string;
    }[];
    const newItem = { [state.dropdownState]: props.dropdownOption };
    const index = array.findIndex(
      (o) => Object.keys(o)[0] === state.dropdownState
    );
    if (index === -1) {
      array.push(newItem);
    } else {
      array[index] = newItem;
    }
    return {
      ...state,
      activeDropdownOptions: array,
      dropdownState: AppDropdownState.Hidden,
    };
  }),

  on(AppActions.toggleNavbar, (state): AppState => {
    return { ...state, isNavbarVisible: !state.isNavbarVisible };
  }),

  on(AppActions.toggleEmailConsent, (state): AppState => {
    return { ...state, emailConsent: !state.emailConsent };
  }),

  on(AppActions.toggleRememberMe, (state): AppState => {
    return { ...state, rememberMe: !state.rememberMe };
  }),

  on(AppActions.credentialsLoginSuccess, (state, props): AppState => {
    state.rememberMe
      ? localStorage.setItem('ec-user', JSON.stringify(props.user))
      : sessionStorage.setItem('ec-user', JSON.stringify(props.user));
    return {
      ...state,
      user: props.user,
      loginErrorMessage: '',
      modalState: AppModalStates.Closed,
    };
  }),

  on(AppActions.isLoggedIn, (state): AppState => {
    const localUser = UtilService.checkUser(localStorage.getItem('ec-user'));
    const sessionUser = UtilService.checkUser(
      sessionStorage.getItem('ec-user')
    );
    return {
      ...state,
      user: state.user
        ? state.user
        : localUser
          ? localUser
          : sessionUser || undefined,
    };
  }),

  on(AppActions.clearUser, (state): AppState => {
    if (localStorage.getItem('ec-user')) {
      localStorage.removeItem('ec-user');
    }
    if (sessionStorage.getItem('ec-user')) {
      sessionStorage.removeItem('ec-user');
    }
    return {
      ...state,
      user: undefined,
    };
  }),

  on(AppActions.setTransactions, (state, props): AppState => {
    return { ...state, transactions: props.txs, };
  }),

  //SET CREATOR DETAILS
  on(AppActions.setCreatorUserDetails, (state): AppState => {
    return {
      ...state,
      creatorItems: {
        ...state.creatorItems,
        useruid: state.user?.uid || state.creatorItems.useruid,
        username: state.user?.username || state.creatorItems.username
      }
    }
  }),
  on(AppActions.setCreatorSendingNetworkWalletAddress, (state, props): AppState => {
    return {
      ...state,
      creatorItems: {
        ...state.creatorItems,
        sendingWallet: {
          ...state.creatorItems.sendingWallet,
          walletAddress: props.walletAddress
        }
      }
    }
  }),
  on(AppActions.setCreatorSendingNetworkVeveUsername, (state, props): AppState => {
    return {
      ...state,
      creatorItems: {
        ...state.creatorItems, sendingWallet: {
          ...state.creatorItems.sendingWallet,
          veveUsername: props.veveUsername
        }
      }
    }
  }),
  on(AppActions.setCreatorSendingAmount, (state, props): AppState => {
    return {
      ...state,
      creatorItems: {
        ...state.creatorItems,
        units: props?.amount.units || state.creatorItems.units!,
        currency: props?.amount.currency || state.creatorItems.currency!,
      }
    }
  }),
  on(AppActions.setCreatorSendingNetworkSymbol, (state, props): AppState => {
    return {
      ...state,
      creatorItems: {
        ...state.creatorItems,
        sendingWallet: {
          ...state.creatorItems.sendingWallet,
          networkSymbol: props.symbol || state.creatorItems.sendingWallet?.networkSymbol,
          network: Networks[props?.symbol || state.creatorItems.sendingWallet?.networkSymbol],
          veveUsername: state.creatorItems.currency !== AppTransactionCurrencies.GEMS ? '' : state.creatorItems.sendingWallet?.veveUsername
        }
      }
    }
  }),
  on(AppActions.setCreatorReceivingNetworkSymbol, (state, props): AppState => {
    return {
      ...state,
      creatorItems: {
        ...state.creatorItems,
        receivingWallet: {
          ...state.creatorItems.receivingWallet,
          networkSymbol: props.symbol || state.creatorItems.receivingWallet?.networkSymbol,
          network: Networks[props?.symbol || state.creatorItems.receivingWallet?.networkSymbol],
          veveUsername: state.creatorItems.currency !== AppTransactionCurrencies.GEMS ? '' : state.creatorItems.receivingWallet?.veveUsername
        }
      }
    }
  }),
  on(AppActions.setCreatorReceivingNetworkWalletAddress, (state, props): AppState => {
    return {
      ...state,
      creatorItems: {
        ...state.creatorItems,
        receivingWallet: {
          ...state.creatorItems.receivingWallet,
          walletAddress: props.walletAddress
        }
      }
    }
  }),
  on(AppActions.setCreatorReceivingFees, (state): AppState => {
    const units = state.purchasorItems.units!;
    const currency = state.purchasorItems.currency;
    const networkSymbol = state.creatorItems.receivingWallet?.networkSymbol!;
  
    const networkDetails = NETWORK_FEES_PC[currency!].find((network) => network.symbol === networkSymbol);
    const networkFees = networkDetails?.fee!;
    const platformFees = networkSymbol ? Math.max(0.05 * units, networkDetails!.minimum! * 0.05): 999;
  
    return {
      ...state,
      creatorItems: {
        ...state.creatorItems,
        fees: {
          networkFees: networkFees,
          platformFees: platformFees,
          totalPostFees: units - platformFees - networkFees,
        }
      }
    }
  }),

  // SET PURCHASOR DETAILS
  on(AppActions.setPurchasorUserDetails, (state): AppState => {
    return {
      ...state,
      creatorItems: {
        ...state.creatorItems,
        useruid: state.user?.uid || state.creatorItems.useruid,
        username: state.user?.username || state.creatorItems.username
      }
    }
  }),
  on(AppActions.setPurchasorSendingNetworkWalletAddress, (state, props): AppState => {
    return {
      ...state,
      purchasorItems: {
        ...state.purchasorItems,
        sendingWallet: {
          ...state.purchasorItems.sendingWallet,
          walletAddress: props.walletAddress
        }
      }
    }
  }),
  on(AppActions.setPurchasorSendingNetworkVeveUsername, (state, props): AppState => {
    return {
      ...state,
      purchasorItems: {
        ...state.purchasorItems, 
        sendingWallet: {
          ...state.purchasorItems.sendingWallet,
          veveUsername: props.veveUsername
        }
      }
    }
  }),
  on(AppActions.setPurchasorSendingAmount, (state, props): AppState => {
    return {
      ...state,
      purchasorItems: {
        ...state.purchasorItems,
        units: props?.amount.units || state.purchasorItems.units!,
        currency: props?.amount.currency || state.purchasorItems.currency!,
      }
    }
  }),
  on(AppActions.setPurchasorSendingNetworkSymbol, (state, props): AppState => {
    return {
      ...state,
      purchasorItems: {
        ...state.purchasorItems,
        sendingWallet: {
          ...state.purchasorItems.sendingWallet,
          networkSymbol: props.symbol || state.purchasorItems.sendingWallet?.networkSymbol,
          network: Networks[props?.symbol || state.purchasorItems.sendingWallet?.networkSymbol],
          veveUsername: state.purchasorItems.currency !== AppTransactionCurrencies.GEMS ? '' : state.purchasorItems.sendingWallet?.veveUsername
        }
      }
    }
  }),
  on(AppActions.setPurchasorReceivingNetworkSymbol, (state, props): AppState => {
    return {
      ...state,
      purchasorItems: {
        ...state.purchasorItems,
        receivingWallet: {
          ...state.purchasorItems.receivingWallet,
          networkSymbol: props.symbol || state.purchasorItems.receivingWallet?.networkSymbol,
          network: Networks[props?.symbol || state.purchasorItems.receivingWallet?.networkSymbol],
          veveUsername: state.purchasorItems.currency !== AppTransactionCurrencies.GEMS ? '' : state.purchasorItems.receivingWallet?.veveUsername
        }
      }
    }
  }),
  on(AppActions.setPurchasorReceivingFees, (state): AppState => {
    const units = state.creatorItems.units!;
    const currency = state.creatorItems.currency;
    const networkSymbol = state.purchasorItems.receivingWallet?.networkSymbol!;
  
    const networkDetails = NETWORK_FEES_PC[currency!].find((network) => network.symbol === networkSymbol);
    const networkFees = networkDetails?.fee!;
    const platformFees = networkSymbol ? Math.max(0.05 * units, networkDetails!.minimum! * 0.05): 999;
  
    return {
      ...state,
      purchasorItems: {
        ...state.purchasorItems,
        fees: {
          networkFees: networkFees,
          platformFees: platformFees,
          totalPostFees: units - platformFees - networkFees,
        }
      }
    }
  }),

  on(AppActions.setCreatorItems, (state, props): AppState => {
    const networkSymbolReceiving =
      props?.amount?.sendingWallet?.networkSymbol ||
      (props?.amount?.currency &&
        props?.amount?.currency !== state.purchasorItems.currency
        ? DEFAULT_NETWORKS[props?.amount?.currency!]
        : state.creatorItems.receivingWallet?.networkSymbol);
    const networkSymbolSending = state.creatorItems.sendingWallet?.networkSymbol;
    const currency = state.creatorItems.currency;
    const units = state.creatorItems.units!;
    const networkFees =
      NETWORK_FEES_PC[currency!].find(
        (network) => network.symbol === (networkSymbolReceiving || networkSymbolSending)
      )?.fee;
    const platformFees = networkSymbolReceiving
      ? Math.max(
        0.05 * units,
        NETWORK_FEES_PC[currency!].find(
          (network) => network.symbol === networkSymbolReceiving
        )!.minimum! * 0.05
      )
      : 999;
    return {
      ...state,
      creatorItems: {
        useruid:
          props?.amount.useruid || state.creatorItems.useruid || state.user!.uid,
        username:
          props?.amount.username ||
          state.creatorItems.username ||
          state.user!.username!,
        sendingWallet: {
          walletAddress:
            props?.amount?.sendingWallet?.walletAddress ||
            state.creatorItems.sendingWallet?.walletAddress,
          veveUsername:
            currency !== AppTransactionCurrencies.GEMS
              ? ''
              : props?.amount?.sendingWallet?.veveUsername ||
              state.creatorItems.sendingWallet?.veveUsername,
        },
        receivingWallet: {
          network:
            Networks[
            props?.amount?.receivingWallet?.networkSymbol ||
            networkSymbolReceiving!
            ],
          networkSymbol: networkSymbolReceiving || networkSymbolSending,
          walletAddress:
            props?.amount?.receivingWallet?.walletAddress ||
            state.creatorItems.receivingWallet?.walletAddress ||
            '',
          veveUsername:
            currency !== AppTransactionCurrencies.GEMS
              ? ''
              : props?.amount?.receivingWallet?.veveUsername ||
              state.creatorItems.receivingWallet?.veveUsername ||
              '',
        },
        fees: {
          networkFees: networkFees!,
          platformFees: platformFees,
          totalPostFees: units - networkFees! - platformFees,
        },
      },
    };
  }),

  on(AppActions.setPurchasorItems, (state, props): AppState => {
    const networkSymbolReceiving =
      props?.amount?.receivingWallet?.networkSymbol ||
      (props?.amount?.currency &&
        props?.amount?.currency !== state.purchasorItems.currency
        ? DEFAULT_NETWORKS[props?.amount?.currency!]
        : state.purchasorItems.receivingWallet?.networkSymbol);
    const networkSymbolSending =
      props?.amount?.sendingWallet?.networkSymbol ||
      (props?.amount?.currency &&
        props?.amount?.currency !== state.purchasorItems.currency
        ? DEFAULT_NETWORKS[props?.amount?.currency!]
        : state.purchasorItems.sendingWallet?.networkSymbol);
    const currency = props?.amount?.currency || state.purchasorItems.currency;
    const units = props?.amount?.units || state.purchasorItems.units!;
    const networkFees = NETWORK_FEES_PC[currency!].find(
      (network) => network.symbol === networkSymbolReceiving
    )!.fee!;
    const platformFees = Math.max(
      0.05 * units,
      NETWORK_FEES_PC[currency!].find(
        (network) => network.symbol === networkSymbolReceiving
      )!.minimum! * 0.05
    );
    return {
      ...state,
      purchasorItems: {
        useruid: props?.amount.useruid || state.purchasorItems.useruid,
        username: props?.amount.username || state.purchasorItems.username || '',
        currency: currency,
        units: props?.amount?.units || state.purchasorItems.units,
        receivingWallet: {
          networkSymbol: networkSymbolReceiving,
          network:
            Networks[
            props?.amount?.receivingWallet?.networkSymbol ||
            networkSymbolReceiving!
            ],
          walletAddress:
            props?.amount?.receivingWallet?.walletAddress ||
            state.purchasorItems.receivingWallet?.walletAddress ||
            '',
          veveUsername:
            currency !== AppTransactionCurrencies.GEMS
              ? ''
              : props?.amount?.receivingWallet?.veveUsername ||
              state.purchasorItems.receivingWallet?.veveUsername ||
              '',
        },
        sendingWallet: {
          networkSymbol: networkSymbolSending || networkSymbolReceiving,
          network:
            Networks[
            props?.amount?.sendingWallet?.networkSymbol ||
            networkSymbolSending!
            ],
          walletAddress:
            props?.amount?.sendingWallet?.walletAddress ||
            state.purchasorItems.sendingWallet?.walletAddress ||
            '',
          veveUsername:
            currency !== AppTransactionCurrencies.GEMS
              ? ''
              : props?.amount?.sendingWallet?.veveUsername ||
              state.purchasorItems.sendingWallet?.veveUsername ||
              '',
        },
        fees: {
          networkFees: networkFees,
          platformFees: platformFees,
          totalPostFees: units - networkFees - platformFees,
        },
      },
    };
  }),

  on(AppActions.setEmailVerificationFailMessage, (state): AppState => {
    return { ...state, loginErrorMessage: AppAuthMessages.EmailUnverified };
  }),

  on(AppActions.setActiveTransaction, (state, props): AppState => {
    return { ...state, activeTransaction: props.txn };
  }),

  on(AppActions.resetNewTransaction, (state): AppState => {
    return {
      ...state,
      creatorItems: initialState.creatorItems,
      purchasorItems: initialState.purchasorItems,
    };
  }),

  on(AppActions.resetPurchaseModal, (state): AppState => {
    return {
      ...state,
      purchasorItems: {
        ...state.activeTransaction?.purchasor,
        username: state.user?.username!,
        useruid: state.user?.uid!,
        sendingWallet: {
          walletAddress: '',
          veveUsername: '',
          network: state.activeTransaction?.purchasor.receivingWallet?.network,
          networkSymbol:
            state.activeTransaction?.purchasor.receivingWallet?.networkSymbol,
        },
      },
      creatorItems: {
        ...state.activeTransaction?.creator,
        sendingWallet: {
          walletAddress: '',
          veveUsername: '',
          network: state.activeTransaction?.creator.sendingWallet?.network,
          networkSymbol:
            state.activeTransaction?.creator.sendingWallet?.networkSymbol,
        },
      },
    };
  })
);
