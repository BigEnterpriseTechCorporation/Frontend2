import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './layout/navigation';
import BgImageContainer from './ui/bgImageContainer';
import logo from "../assets/icons/logo.svg";
import headerBg from "../assets/gifs/Home-header.gif";
import footerBg from '../assets/gifs/Home-footer.gif';
import question1 from "../assets/gifs/question-1.gif";
import question2 from '../assets/gifs/question-2.gif';
import question3 from '../assets/gifs/question-3.gif';
import organisation from "../assets/gifs/organisation.png";
import volunteer from "../assets/gifs/volunteer.png";
import '../assets/styles/Home.css';

export default function Home() {
	return (
		<main className="home-main">
			<header className="home-header">
				<Navigation />
				<img
					src={logo}
					alt=''
					className="logo"
				/>
				<div>
					<h1 className="main-title">
						Together
						<br /> We Can
					</h1>
					<h3 className="subtitle">
						Вместе мы можем больше
					</h3>
				</div>
				<Link
					to="/"
					className="cta-button"
				>
					Участвовать
				</Link>
				<img
					src={headerBg}
					alt=''
					className="header-bg"
				/>
			</header>
			<section
				className="section"
				id='goals'
			>
				<h1 className="section-title">Цели нашей платформы</h1>
				<ul className="goals-list">
					<li className="goal-item">
						<BgImageContainer
							image={question1}
							className="goal-container"
						>
							<h2 className="goal-title">
								Укрепление доверия через прозрачность и безопасность
							</h2>
							<p className="goal-description">
								Использовать алгоритмы для рекомендации мероприятий на основе предпочтений
								пользователя (экология, помощь детям, медицина), а также напоминаний и трекинга
								личных достижений (часы волонтёрства, пройденные тренинги).
							</p>
						</BgImageContainer>
					</li>
					<li className="goal-item">
						<BgImageContainer
							image={question2}
							className="goal-container"
						>
							<h2 className="goal-title">Стимулировать долгосрочное участие</h2>
							<p className="goal-description">
								Внедрить систему бонусов (сертификаты, партнёрские скидки) и возможность создавать
								«волонтёрские резюме». Добавить образовательные материалы (вебинары, гайды) для
								развития навыков и мотивации.
							</p>
						</BgImageContainer>
					</li>
					<li className="goal-item">
						<BgImageContainer
							image={question3}
							className="goal-container"
						>
							<h2 className="goal-title">
								Создать удобную среду для взаимодействия НКО и волонтёров
							</h2>
							<p className="goal-description">
								Упростить поиск и коммуникацию между организациями и добровольцами с помощью
								фильтров (геолокация, интересы, навыки), чатов и системы отзывов.
							</p>
						</BgImageContainer>
					</li>
				</ul>
			</section>
			<section className="section">
				<h1 className="section-title">Наши возможности</h1>
				<ul className="features-list">
					<li className="feature-item">
						<BgImageContainer
							image={organisation}
							className="feature-container"
						>
							<h2 className="feature-title">Для организаций</h2>
							<p className="feature-description">
								Вы можете разместить свои объявления об мероприятиях, которые увидят сотни
								волонтёров. Также вы можете нанимать их
							</p>
						</BgImageContainer>
					</li>
					<li className="feature-item">
						<BgImageContainer
							image={volunteer}
							className="feature-container"
						>
							<h2 className="feature-title">Для волонтёров</h2>
							<p className="feature-description">
								Вы можете найти подходящее для вас событие и помочь ещё большому количеству
								нуждающихся
							</p>
						</BgImageContainer>
					</li>
				</ul>
			</section>
			<footer>
				<BgImageContainer
					image={footerBg}
					className="footer-container"
					imageClassName="footer-image"
				>
					<div className="footer-content">
						<div className="footer-columns">
							<div>
								<h2 className="footer-column-title">Администрации</h2>
								<ul className="footer-links">
									<li>
										<Link to="/">Профиль</Link>
									</li>
									<li>
										<Link to="/panels/admin">Панель администратора</Link>
									</li>
									<li>
										<Link to="/">Список волонтёров</Link>
									</li>
									<li>
										<Link to="/">Список организаций</Link>
									</li>
								</ul>
							</div>
							<div>
								<h2 className="footer-column-title">Волонтёрам</h2>
								<ul className="footer-links">
									<li>
										<Link to="/volunteer">Профиль</Link>
									</li>
									<li>
										<Link to="/">Мероприятия</Link>
									</li>
									<li>
										<Link to="/">Выписки</Link>
									</li>
								</ul>
							</div>
							<div>
								<h2 className="footer-column-title">Организациям</h2>
								<ul className="footer-links">
									<li>
										<Link to="/">Профиль</Link>
									</li>
									<li>
										<Link to="/">Мероприятия</Link>
									</li>
									<li>
										<Link to="/">Заявки волонтёров</Link>
									</li>
									<li>
										<Link to="/">Выписки</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="footer-copyright">
						<h3 className="copyright-text">Обезьяны с гранатами</h3>
					</div>
				</BgImageContainer>
			</footer>
		</main>
	);
} 