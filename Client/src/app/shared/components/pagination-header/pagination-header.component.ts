import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination-header',
  templateUrl: './pagination-header.component.html',
  styleUrls: ['./pagination-header.component.scss']
})
export class PaginationHeaderComponent {
  @Input() totalCount!: number;
  @Input() pageNumber!: number;
  @Input() pageSize!: number;
}
