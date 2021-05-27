import { Injectable } from '@angular/core';
import { NETWORK_FEES_PC } from 'functions/src/utils/constants.utils';
import { WalletTypes } from 'functions/src/utils/enums.utils';
import { IAmount, IUser } from 'functions/src/utils/interfaces.utils';
import { IWallet } from '../../../functions/src/utils/interfaces.utils';
import {
  Networks,
  AppTransactionItemTypes,
} from '../../../functions/src/utils/enums.utils';

@Injectable()
export class UtilService {
  constructor() {}

  static checkUser(user: string | null): IUser | undefined {
    return !!user && user.startsWith('{', 0) ? JSON.parse(user) : undefined;
  }

  static checkTransactionDetails(
    amount: IAmount,
    wallet: IWallet,
    isPurchaser = false
  ): string[] {
    var response = undefined;
    if (!isPurchaser) {
      response = response || this.checkItemType(amount);
      response = response || this.checkMinimum(amount, wallet);
    }
    response = response || this.checkAddress(wallet);
    if (wallet.network === Networks.VEVE) {
      response = response || this.checkVeveUsername(wallet);
    }
    return [response || ''];
  }

  static checkMinimum(amount: IAmount, wallet: IWallet): string | void {
    const units = amount.sendingUnits;
    const currency = amount.sendingCurrency;
    const symbol = wallet.networkSymbol;
    const minimum = NETWORK_FEES_PC[currency!].find(
      (obj) => obj.symbol === symbol
    )!.minimum;
    if (!units || units < minimum)
      return (
        'You need to exchange a minimum of ' +
        minimum +
        ' ' +
        currency +
        ' to proceed.'
      );
  }

  static checkAddress(wallet: IWallet): string | void {
    const address = wallet.walletAddress;
    if (!address || address.length < 10) {
      return 'Invalid wallet address - please correct it before proceeding.';
    }
    if (!this.isAlphaNumeric(address)) {
      return 'Your wallet address should only consist of letters and numbers.';
    }
  }

  static checkVeveUsername(wallet: IWallet): string | void {
    const username = wallet.veveUsername;
    if (!username) return 'Please enter your VeVe username.';
  }

  static checkItemType(amount: IAmount): string | void {
    if (amount.itemType === AppTransactionItemTypes.Collectible) {
      return 'We do not support collectibles currently - please try again later.';
    }
  }

  static isAlphaNumeric(str: string) {
    var code, i, len;
    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (
        !(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)
      ) {
        // lower alpha (a-z)
        return false;
      }
    }
    return true;
  }
}
