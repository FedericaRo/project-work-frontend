import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }


  typeLable(type: string): string {
    switch (type.toUpperCase()) {
      case 'AMMINISTRATIVA':
        return 'bg-red-200 text-red-600';
      case 'ORGANIZZATIVA':
        return 'bg-yellow-200 text-yellow-600 font-bold';
      case 'INFORMATIVA':
        return 'bg-green-200 text-green-600 font-bold';
      case 'CAMBIOTURNO':
        return 'bg-blue-200 text-blue-600 font-bold';
      default:
        return 'bg-gray-200 text-gray-600 font-bold';
    }
  }

  importanceLable(importance: string): string {
    switch (importance.toUpperCase()) {
      case 'ALTA':
        return 'bg-red-200 text-red-600 font-bold';
      case 'MEDIA':
        return 'bg-yellow-200 text-yellow-600 font-bold';
      case 'BASSA':
        return 'bg-green-200 text-green-600 font-bold';
      default:
        return 'bg-gray-200 text-gray-600 font-bold';
    }
  }
}
