import { Component, OnInit, Input, EventEmitter, ChangeDetectionStrategy, HostListener, Output } from '@angular/core';
import { ActionItem } from './action-item.model';

@Component({
    selector: 'eo-action-button',
    templateUrl: './action-button.component.html',
    styleUrls: ['./action-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionButtonComponent {
    @Input() type: ButtonType = 'default';
    @Input() direction: DropDirection = 'down';
    @Input() icon: string;
    @Input() btnSize: ButtonSize;
    @Input() buttonText: string;
    @Input() cssClass: string;
    @Input() isOpen = false;
    @Input() actions: ActionItem[];
    @Input() disabled = false;
    @Input() buttonAction: Boolean;
    @Input() customerStyle: any;
    @Output() buttonClick = new EventEmitter<Boolean>();
    @Output() actionClick = new EventEmitter<ActionItem>();
    @Output() openStatusChange = new EventEmitter<boolean>();


    buttonToggle($event?: MouseEvent) {
        if ($event) {
            $event.stopPropagation();
        }
        if (this.buttonAction) {
            this.buttonClick.emit(true)
        }
        else {

            this.isOpen = !this.isOpen;
            this.openStatusChange.emit(this.isOpen);
        }
    }
    toggle($event?: MouseEvent) {
        if ($event) {
            $event.stopPropagation();
        }
        this.isOpen = !this.isOpen;
        this.openStatusChange.emit(this.isOpen);
    }

    @HostListener('document:click', ['$event'])
    close($event?: MouseEvent) {
        this.isOpen = false;
        this.openStatusChange.emit(this.isOpen);
    }

    onActionClick(item: ActionItem) {
        if (!item.disabled) {
            this.close();
            this.actionClick.emit(item);
        }
    }
}
