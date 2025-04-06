import React from 'react';
import { Link } from 'react-router';

const pixelArtStyle = {
	fontFamily: '"Press Start 2P", "VT323", monospace',
	textRendering: 'optimizeSpeed',
	imageRendering: 'pixelated',
	letterSpacing: '1px'
};

const pixelBorder = (color = '#8bac82', size = 4) => ({
	border: `${size}px solid ${color}`,
	boxShadow: `${size}px ${size}px 0 #000`,
	position: 'relative',
	imageRendering: 'pixelated'
});

const pixelButton = {
	...pixelBorder('#f8e71c'),
	background: '#ff6b6b',
	color: '#fff',
	padding: '10px 20px',
	cursor: 'pointer',
	textTransform: 'uppercase',
	textDecoration: 'none',
	display: 'inline-block',
	margin: '10px',
	borderRadius: 0,
	transition: 'transform 0.1s, box-shadow 0.1s',
	fontFamily: '"Press Start 2P", monospace',
	fontSize: '16px',
	textAlign: 'center',
	lineHeight: 1.5
};

// Pixel art elements
const PixelCloud = ({ style }) => (
	<div style={{
		width: '100px',
		height: '60px',
		background: '#fff',
		position: 'absolute',
		borderRadius: 0,
		border: '4px solid #000',
		boxShadow: 'inset -8px -8px 0 0 #ccc',
		...style
	}}>
		<div style={{
			width: '30px',
			height: '20px',
			background: '#fff',
			position: 'absolute',
			top: '-20px',
			left: '20px',
			border: '4px solid #000',
			borderBottom: 'none'
		}} />
		<div style={{
			width: '40px',
			height: '25px',
			background: '#fff',
			position: 'absolute',
			top: '-25px',
			left: '45px',
			border: '4px solid #000',
			borderBottom: 'none'
		}} />
	</div>
);

const PixelStar = ({ style }) => (
	<div style={{
		position: 'absolute',
		width: '20px',
		height: '20px',
		backgroundColor: '#ffff00',
		boxShadow: '0 0 10px 2px #ffff00',
		clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
		...style
	}} />
);

const HomePage = () => {
	return (
		<div style={{ 
			textAlign: 'center', 
			padding: '40px', 
			color: '#fff',
			backgroundColor: '#4a2379',
			backgroundImage: 'linear-gradient(45deg, #4a2379 25%, #34294f 25%, #34294f 50%, #4a2379 50%, #4a2379 75%, #34294f 75%, #34294f 100%)',
			backgroundSize: '20px 20px',
			minHeight: '100vh',
			...pixelArtStyle,
			overflow: 'hidden',
			position: 'relative'
		}}>
			{/* Pixel art decorations */}
			<PixelCloud style={{ top: '80px', left: '5%' }} />
			<PixelCloud style={{ top: '150px', right: '8%' }} />
			<PixelStar style={{ top: '15%', left: '15%' }} />
			<PixelStar style={{ top: '25%', right: '20%' }} />
			<PixelStar style={{ top: '60%', left: '10%' }} />
			<PixelStar style={{ top: '75%', right: '12%' }} />
			
			<div style={{
				position: 'absolute',
				bottom: 0,
				left: 0,
				right: 0,
				height: '20px',
				backgroundColor: '#78e08f',
				borderTop: '4px solid #000',
				imageRendering: 'pixelated'
			}} />
			
			<header style={{ marginBottom: '60px', position: 'relative', zIndex: 1 }}>
				<h1 style={{ 
					fontSize: '48px', 
					marginBottom: '30px',
					color: '#ffd866',
					textShadow: '4px 4px 0 #000',
					letterSpacing: '2px',
					textTransform: 'uppercase'
				}}>
					Together We Can
				</h1>
				<div style={{
					width: '100px',
					height: '12px',
					margin: '0 auto 20px',
					backgroundImage: 'linear-gradient(to right, #fff 0%, #fff 20%, transparent 20%, transparent 40%, #fff 40%, #fff 60%, transparent 60%, transparent 80%, #fff 80%, #fff 100%)',
				}} />
				<h3 style={{ fontSize: '20px', fontWeight: 'normal', color: '#78e08f', marginBottom: '30px' }}>
					Вместе мы можем больше
				</h3>
				<div style={{ marginTop: '40px' }}>
					<Link to="/" style={{
						...pixelButton,
						transform: 'scale(1.1)',
						transition: 'transform 0.2s, box-shadow 0.2s',
						':hover': {
							transform: 'scale(1.2)',
							boxShadow: '6px 6px 0 #000',
						}
					}}>
						Участвовать
					</Link>
				</div>
			</header>

			<section style={{ marginBottom: '60px', position: 'relative', zIndex: 1 }}>
				<h2 style={{ 
					fontSize: '28px', 
					marginBottom: '40px',
					color: '#ff9ff3',
					textShadow: '3px 3px 0 #000'
				}}>Цели нашей платформы</h2>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '800px', margin: '0 auto' }}>
					<div style={{ 
						padding: '25px', 
						backgroundColor: '#222034',
						...pixelBorder('#78e08f'),
						imageRendering: 'pixelated'
					}}>
						<h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#ffeaa7' }}>
							⬛ Укрепление доверия ⬛
						</h3>
						<p style={{ lineHeight: '1.6', fontSize: '16px' }}>
							Использовать алгоритмы для рекомендации мероприятий на основе предпочтений
							пользователя (экология, помощь детям, медицина), а также напоминаний и трекинга
							личных достижений.
						</p>
					</div>
					
					<div style={{ 
						padding: '25px', 
						backgroundColor: '#222034',
						...pixelBorder('#ffbe76'),
						imageRendering: 'pixelated'
					}}>
						<h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#ffeaa7' }}>
							⬛ Долгосрочное участие ⬛
						</h3>
						<p style={{ lineHeight: '1.6', fontSize: '16px' }}>
							Внедрить систему бонусов (сертификаты, скидки) и возможность создавать
							«волонтёрские резюме». Добавить образовательные материалы (вебинары, гайды) для
							развития навыков.
						</p>
					</div>
				</div>
			</section>

			<footer style={{ 
				marginTop: '60px', 
				borderTop: '4px solid #ff9ff3', 
				padding: '20px', 
				imageRendering: 'pixelated',
				position: 'relative',
				zIndex: 1
			}}>
				<p style={{ fontSize: '14px', color: '#78e08f' }}>
					⬛⬛⬛ © 2023 Волонтёрская платформа ⬛⬛⬛
				</p>
			</footer>
		</div>
	);
};

export default HomePage; 