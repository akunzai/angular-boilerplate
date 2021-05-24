export default class Todo {
  constructor(
    public id: number,
    public title: string,
    public description?: string,
    public done = false
  ){}
}
