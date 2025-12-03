import { useEffect, useRef } from 'react'
import sam from 'src/assets/cropped_son.png'

interface Player {
	x: number
	y: number
	width: number
	height: number
	image: HTMLImageElement
	velocityY: number
	isJumping: boolean
}

interface Obstacle {
	x: number
	y: number
	width: number
	height: number
	counted?: boolean
}

export const Home = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const animationRef = useRef<number>()
	const scoreRef = useRef<number>(0)
	const gameOverRef = useRef<boolean>(false)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		canvas.width = 1400
		canvas.height = 700
		const paddingBottom = 10
		const gravity = 0.6
		const jumpVelocity = -12
		const obstacleSpeed = 4
		const obstacles: Obstacle[] = []

		const player: Player = {
			x: canvas.width - 200,
			y: canvas.height - paddingBottom - 120,
			width: 180,
			height: 120,
			image: new Image(),
			velocityY: 0,
			isJumping: false,
		}

		player.image.src = sam

		const spawnObstacle = () => {
			const width = 50 + Math.random() * 30
			const height = 50 + Math.random() * 30
			obstacles.push({
				x: 0,
				y: canvas.height - paddingBottom - height,
				width,
				height,
			})
		}

		const handleJump = () => {
			if (!player.isJumping) {
				player.velocityY = jumpVelocity
				player.isJumping = true
			}
		}

		const checkCollision = (a: Player, b: Obstacle) => {
			return (
				a.x < b.x + b.width &&
				a.x + a.width > b.x &&
				a.y < b.y + b.height &&
				a.y + a.height > b.y
			)
		}

		let lastObstacleTime = 0
		const obstacleInterval = 2000

		const animate = (timestamp?: number) => {
			if (gameOverRef.current) return

			ctx.clearRect(0, 0, canvas.width, canvas.height)

			player.velocityY += gravity
			player.y += player.velocityY

			if (player.y > canvas.height - paddingBottom - player.height) {
				player.y = canvas.height - paddingBottom - player.height
				player.velocityY = 0
				player.isJumping = false
			}

			ctx.drawImage(
				player.image,
				player.x,
				player.y,
				player.width,
				player.height
			)

			for (let i = obstacles.length - 1; i >= 0; i--) {
				const obs = obstacles[i]
				obs.x += obstacleSpeed
				ctx.fillStyle = 'red'
				ctx.fillRect(obs.x, obs.y, obs.width, obs.height)

				if (checkCollision(player, obs)) {
					gameOverRef.current = true
					cancelAnimationFrame(animationRef.current!)
					alert(`Game Over! Score: ${scoreRef.current}`)
					return
				}

				if (
					!obs.counted &&
					obs.x + obs.width > player.x + player.width
				) {
					scoreRef.current += 1
					obs.counted = true
				}

				if (obs.x > canvas.width) obstacles.splice(i, 1)
			}

			if (
				!lastObstacleTime ||
				(timestamp && timestamp - lastObstacleTime > obstacleInterval)
			) {
				spawnObstacle()
				lastObstacleTime = timestamp || 0
			}

			ctx.fillStyle = 'white'
			ctx.font = '30px Arial'
			ctx.fillText(`Score: ${scoreRef.current}`, 50, 50)

			animationRef.current = requestAnimationFrame(animate)
		}

		player.image.onload = () => {
			animate()
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.code === 'Space') handleJump()
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			if (animationRef.current) cancelAnimationFrame(animationRef.current)
		}
	}, [])

	return <canvas ref={canvasRef} className='bg-black' />
}
