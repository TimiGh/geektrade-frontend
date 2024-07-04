import {Component, EventEmitter, Output} from '@angular/core';
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-quality-filter',
  templateUrl: './quality-filter.component.html',
  styleUrls: ['./quality-filter.component.scss']
})
export class QualityFilterComponent {
selection = {
  used: false,
  unused: false
};
  @Output() qualityChanged: EventEmitter<any> = new EventEmitter<any>();


  selectionChanged($event: MatCheckboxChange, quality: string) {
    if (quality === 'used') {
      this.selection.used = $event.checked;
      if ($event.checked) {
        this.selection.unused = !$event.checked;
      }
    } else {
      this.selection.unused = $event.checked;
      if ($event.checked) {
        this.selection.used = !$event.checked;
      }
    }

    this.qualityChanged.emit({quality: quality, value: $event.checked});
  }
}
