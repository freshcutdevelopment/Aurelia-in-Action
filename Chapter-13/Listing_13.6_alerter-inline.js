import {inlineView} from 'aurelia-framework';

@inlineView(`<template>
              <button type="button" class="btn btn-outline-success" 
                      click.delegate="showAlert()">Success
              </button>
             </template>`)
export class AlerterInline{
  
    showAlert(){
      alert("hello world");
    }
}