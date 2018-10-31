import {Component, OnInit} from '@angular/core';
import {TextService} from '../text-service/text.service';
import {ActionService} from '../action-service/action.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  public similar: Observable<string[]>;
  public styles = {};
  public text = [];
  private index: number = null;
  private readonly actions = {
    bold: (style) => TextService.bold(style),
    color: (style, value) => TextService.color(style, value),
    italic: (style) => TextService.italic(style),
    underline: (style) => TextService.underline(style),
  };

  constructor(private actionService: ActionService, private textService: TextService) {
  }

  ngOnInit() {
    TextService.getMockText().then((result) => {
      this.text = result.match(/\w+|\s+|[^\s\w]+/g);
    });
    this.actionService.action$.subscribe((res) => {
      if (this.index !== null) {
        if (!this.styles[this.index]) {
          this.styles[this.index] = TextService.getNewStyle();
        }
        this.actions[res.type](this.styles[this.index], res.payload);
      }
    });
  }

  public onSimilarCLick(word) {
    if (this.index !== null) {
      this.text[this.index] = word;
      this.index = null;
    }
  }

  public onFileMousedown() {
    this.index = null;
  }

  public onWordClick(e, i) {
    const wordEl = e.target;
    const text = wordEl.innerText;
    if (TextService.isWord(text)) {
      this.index = i;
      this.similar = this.textService.getSimilarWords(text);
    }
  }

  public trackByIndex(index) {
    return index;
  }
}
