import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

interface Word {
  word: string;
  score: number;
  tags: string[];
}

enum STYLE {
  BOLD_ON = 'bold',
  BOLD_OFF = 'normal',
  ITALIC_ON = 'italic',
  ITALIC_OFF = 'normal',
  UNDERLINE_ON = 'underline',
  UNDERLINE_OFF = 'none',
}

@Injectable()
export class TextService {
  constructor(private http: HttpClient) {}
  static bold(style) {
    style['font-weight'] = (style['font-weight'] !== STYLE.BOLD_ON) ? STYLE.BOLD_ON : STYLE.BOLD_OFF;
  }
  static color(style, value) {
    style['color'] = value;
  }
  static isWord(value: string): boolean {
    return /\w+/g.test(value);
  }
  static italic(style) {
    style['font-style'] = (style['font-style'] !== STYLE.ITALIC_ON) ? STYLE.ITALIC_ON : STYLE.ITALIC_OFF;
  }
  static getNewStyle() {
    return {
      'color': '#000000',
      'font-weight': 'normal',
      'font-style': 'normal',
      'text-decoration': 'none'
    };
  }
  static underline(style) {
    style['text-decoration'] = (style['text-decoration'] !== STYLE.UNDERLINE_ON) ? STYLE.UNDERLINE_ON : STYLE.UNDERLINE_OFF;
  }
  static getMockText() {
    return new Promise<string>(function (resolve) {
      resolve('A year ago I was in the audience at a gathering of designers in San Francisco. ' +
        'There were four designers on stage, and two of them worked for me. I was there to support them. ' +
        'The topic of design responsibility came up, possibly brought up by one of my designers, I honestly don’t remember the details. ' +
        'What I do remember is that at some point in the discussion I raised my hand and suggested, to this group of designers, ' +
        'that modern design problems were very complex. And we ought to need a license to solve them.');
    });
  }
  public getSimilarWords(word: string): Observable<string[]> {
    return this.http.get<Word[]>(`https://api.datamuse.com/words?ml=${word}`).pipe(
      map((words: Word[]) => words.map((i: Word): string => i.word))
    );
  }
}
