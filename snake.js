import { getInputDirection } from "./input.js"
export const SNAKE_SPEED = 4
const snakebody = [{ x: 11, y: 11 }]
let newSegments = 0
export function update() {
    addSegments()
    const inputDirection = getInputDirection()
    for (let i = snakebody.length - 2; i >= 0; i--) {
        snakebody[i + 1] = { ...snakebody[i] }
    }
    snakebody[0].x += inputDirection.x
    snakebody[0].y += inputDirection.y
}
export function draw(gameBoard) {
    snakebody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}
export function expandSnake(amount) {
    newSegments += amount
}
export function OnSnake(position, { ignoreHead = false } = {}) {
    return snakebody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}
export function getSnakeHead() {
    return snakebody[0]
}
export function snakeIntersection() {
    return OnSnake(snakebody[0], { ignoreHead: true })
}
function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}
function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakebody.push({ ...snakebody[snakebody.length - 1] })
    }
    newSegments = 0
}