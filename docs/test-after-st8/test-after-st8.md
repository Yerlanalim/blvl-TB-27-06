1. Регистрация пользователя:
- подтверждение по email прило  При переходе на ссылку в письме переводит на страницу http://localhost:3000/#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired. Но пользователь успешно зарегистрирован.

2. Пользователь под емейлом вошел. 
3. Включилась страница онбординг 1. Имя принято, загрузка аватара сработала, но новая картинка в аватаре не появилась.
4. http://localhost:3001/onboarding:
- видео стоит в режиме загрузки, не запустилось. 
- стоит ошибка next.js: TypeError: Cannot read properties of null (reading 'chapters')
5. При нажатии на "Начать" перешел на страницу Карта урвоней -  http://localhost:3001/roadmaps?level=1&onboarding=true
6. При нажатии на 1 уровен - Основы предпринимательства - перешел на страницу http://localhost:3001/roadmaps/business-basics:
- Контента для уровка нет: Основы предпринимательства
Изучите фундаментальные принципы бизнеса и предпринимательства
No content available for this roadmap yet.
7. При нажатии на иконку Лео (справа внизу экрана) крутится спинер "Загружаю историю чата". Чат не загружается.
8. При нажатии на стрелку вверху справа "Добро пожаловать в BizLevel!" переводит на страницу http://localhost:3001/roadmaps - Карта уровней.
 9. При нажатии на ссылку "Начать с последнего места" переводит на страницу http://localhost:3001/question/welcome-to-business. 
 На этой странице:
 - Прогресс: Уровень 1. 14%. Урок 1 из 7 • Осталось: 6. 
 - Стоит таймер с Resrt - Play - Submit - Start
 - Опрос: Description
Resources
Stats
0s
Добро пожаловать в мир бизнеса!
Beginner
Готовы ли вы начать свой путь предпринимателя?
Choose an option below
Да, начнем!
Хочу узнать больше
Да, начнем!
Хочу узнать больше
Да, начнем!
Хочу узнать больше

- Справа вверху стоит кнопка Get Premium. При нажатии высплывает окно на англйиском:
Unlock a personalized learning experience
Upgrade your account from just $0.17 a day - Cancel anytime.


Annual discount (20% discount)
Премиум $ 4.99 в месяц, годовая оплата
Идеально для тех, кто ищет персонализированный опыт изучения бизнеса.

Everything in the free, plus:
Доступ к премиум урокам
15 персонализированных программ под ваши цели каждый месяц
Глубокая аналитика и отслеживание прогресса
Персональные бизнес-кейсы
Неограниченные токены AI-наставника

Get Premium
Lifetime $ 149(зачеркнуто) 94.99 pay once, yours forever
Access to all features and future updates!
Everything in the free, plus:
Access to premium questions
25 personalized roadmaps tailored to your goals
In depth stat analysis and progress tracking
Personalized coding challenges
500 AI assistant tokens
Lifetime access to all features and future updates!
Get Premium

Students Save 30%!
Unlock your full potential and claim your student discount
Claim Discount

- При нажатии на Get Premium - переводит на страницу с оплатой Stripe (хотя она у нас не должна быть еще настроена) - https://buy.stripe.com/28o8y0gna9LigY828k?client_reference_id=02047f67-6814-4d9a-8102-79f53fa47a92

- Страница с уровнем 1 есть - http://localhost:3001/question/business-models-test-1. Тест работает, видео показывается . Кнопки Дальше работают с зависанием. 
- При неверном ответе на вопрос - включается:
That was incorrect, try again!
Your Answer
Подписка (это ответ на вопрос)
Correct Answer (пустой)
Explain this answer
Don't understand this answer? Click the button below to get an explanation.
Upgrade to Premium to access AI-powered explanations!
Explain Answer
Want to continue the flow? Click the button below to go to the next question.
Next Question

- При нажатии Next Question - переводит на страницу http://localhost:3001/question/smart-goals-video. Видео на странице не загрузилось. 

- При ответе на следующий вопрос (ответил правильно) снова переводит на страницу на английском That was incorrect, try again!

- После ответа на последний вопрос - не было кнопки Завершить уровень. Перешел на страницу Карат Уровней, прогресс по Основы предпринимательства - стоит 0. 