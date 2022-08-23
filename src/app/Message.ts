export class Message {
  text: string = "";
  self: boolean = false;

  constructor(text?: string, self?: boolean) {
    this.text = text || "";
    this.self = self || false;
  }
}
