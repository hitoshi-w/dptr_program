export interface SquarePropsInterface {
  value: string
  onClick: () => void
}

export interface BoardPropsInterface {
  squares: Array<string>
  onClick: (i: number) => void
}

export interface GamePropsInterface {
  history: Array<{
    squares: Array<string>
　}>
  xIsNext: boolean
}