import {Component, OnInit} from '@angular/core';
import {ActionService} from '../action-service/action.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  colors = [
    '#000000',
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3f51b5',
    '#2196f3',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#ffc107',
    '#ff9800',
    '#ff5722'
  ];

  constructor(private action: ActionService) {
  }

  ngOnInit() {
  }

  public onStyleClick(type: string, payload: string): void {
    this.action.emit({type, payload});
  }
}
