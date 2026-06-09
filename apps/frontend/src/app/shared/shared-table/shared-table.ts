import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-shared-table',
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './shared-table.html',
  styleUrl: './shared-table.css',
})
export class SharedTableComponent {

  constructor(private router: Router) {}

  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() createRoute!: string;
  @Input() viewRoute!: string;
  @Input() editRoute!: string;

  @Input() viewIdKey!: string;

  @Input() queryParamKey: string = '';
  @Input() queryParamValue: string = '';
  
  @Input() showViewButton: boolean = true;
  @Input() showEditButton: boolean = true;
  @Input() showDelete: boolean = false;
  @Input() showCreateButton: boolean = true;
  @Input() showEmailButton: boolean = false;

  @Input() columns!: {
    key: string;
    label: string;
  }[];

  @Input() data!: any[];

  @Output() view = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() sendEmail = new EventEmitter<any>();

  openView(item: any): void {
    if (this.viewRoute) {
      this.router.navigate([
        this.viewRoute,
        item[this.viewIdKey]
      ]);
      return;
    }
    this.view.emit(item);
  }

  openEdit(item: any): void {
    if (!this.editRoute) {
      return;
    }
    this.router.navigate(
      [this.editRoute],
      {
        queryParams: {
          [this.queryParamKey]:
            item[this.queryParamValue]
        }
      }
    );
  }

  openDelete(item: any): void {
    this.delete.emit(item);
  }

  openEmail(item: any): void {
    this.sendEmail.emit(item);
  }
}