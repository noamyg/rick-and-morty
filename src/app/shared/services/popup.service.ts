import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  readonly defaultOptions: Message = {
    life: 3000,
    sticky: false
  };

  constructor(
    private messageService: MessageService
  ) {}

  success(head: string,
    body?: string,
    options: Message = this.defaultOptions): void {
    this.addSingle({
      ...options,
      severity: 'success',
      summary: head,
      detail: body
    });
  }

  info(head: string,
    body?: string,
    options: Message = this.defaultOptions): void {
    this.addSingle({
      ...options,
      severity: 'info',
      summary: head,
      detail: body
    });
  }

  warn(head: string,
    body?: string,
    options: Message = this.defaultOptions): void {
    this.addSingle({
      ...options,
      severity: 'warn',
      summary: head,
      detail: body
    });
  }

  error(head: string,
    body?: string,
    options: Message = this.defaultOptions): void {
    this.addSingle({
      ...options,
      severity: 'error',
      summary: head,
      detail: body
    });
  }

  brand(head: string,
    body?: string,
    options: Message = this.defaultOptions): void {
    this.addSingle({
      ...options,
      severity: 'brand',
      summary: head,
      detail: body
    });
  }

  clear(): void {
    this.messageService.clear();
  }

  private addSingle(options: Message): void {
    this.messageService.add({
      ...options
    });
  }
}
