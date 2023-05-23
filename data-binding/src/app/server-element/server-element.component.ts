import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
})
export class ServerElementComponent implements OnInit {
  // By setting alia 'srvElement', now have to use 'srvElement' for binding in HTML, element will no longer work
  @Input('srvElement') element: { type: string; name: string; content: string };

  constructor() {}

  ngOnInit(): void {}
}
