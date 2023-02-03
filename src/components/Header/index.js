import React, { useState } from 'react';
import { SECTIONS } from '../../enums';
import './header.css';

const Header = () => {
  const menuItems = SECTIONS.map(item => (
    <li key={item.title}>
      <a href={`#${item.slug}`} className="cursor-pointer">
        <span className="page-navigation__item"> {item.title}</span>
      </a>
    </li>
  ));

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const navClass = `page-navigation${
    isMenuOpen ? ' page-navigation--open' : ''
  }`;
  const buttonClass = `page-navigation__toggle ${
    isMenuOpen ? ' page-navigation__toggle--open' : ''
  }`;
  const listClass = `page-navigation__list${
    isMenuOpen ? ' page-navigation__list--open' : ''
  }`;

  return (
    <header className="bg-sky-600">
      <div className="container mx-auto px-5">
        <div className="border-b-2 border-b-sky-300">
          <div className="flex flex-row space-x-5 py-5">
            <img
              className="w-10 md:w-16"
              src="/icons/community/events4friends-ny-64x64.png"
              width="32"
              height="32"
              alt="Events for friends logo"
            />
            <svg
              className="h-10 md:h-16 lg:w-40"
              width="118"
              height="15"
              viewBox="0 0 118 15"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.17676 14.1758C3.8877 14.1758 2.83887 13.7539 2.03027 12.9102C1.22168 12.0605 0.817383 10.9268 0.817383 9.50879V9.20996C0.817383 8.2666 0.996094 7.42578 1.35352 6.6875C1.7168 5.94336 2.2207 5.36328 2.86523 4.94727C3.51562 4.52539 4.21875 4.31445 4.97461 4.31445C6.21094 4.31445 7.17188 4.72168 7.85742 5.53613C8.54297 6.35059 8.88574 7.5166 8.88574 9.03418V9.71094H2.44336C2.4668 10.6484 2.73926 11.4072 3.26074 11.9873C3.78809 12.5615 4.45605 12.8486 5.26465 12.8486C5.83887 12.8486 6.3252 12.7314 6.72363 12.4971C7.12207 12.2627 7.4707 11.9521 7.76953 11.5654L8.7627 12.3389C7.96582 13.5635 6.77051 14.1758 5.17676 14.1758ZM4.97461 5.65039C4.31836 5.65039 3.76758 5.89062 3.32227 6.37109C2.87695 6.8457 2.60156 7.51367 2.49609 8.375H7.25977V8.25195C7.21289 7.42578 6.99023 6.78711 6.5918 6.33594C6.19336 5.87891 5.6543 5.65039 4.97461 5.65039ZM13.79 11.7939L16.1455 4.49023H17.8066L14.3965 14H13.1572L9.71191 4.49023H11.373L13.79 11.7939ZM23.1943 14.1758C21.9053 14.1758 20.8564 13.7539 20.0479 12.9102C19.2393 12.0605 18.835 10.9268 18.835 9.50879V9.20996C18.835 8.2666 19.0137 7.42578 19.3711 6.6875C19.7344 5.94336 20.2383 5.36328 20.8828 4.94727C21.5332 4.52539 22.2363 4.31445 22.9922 4.31445C24.2285 4.31445 25.1895 4.72168 25.875 5.53613C26.5605 6.35059 26.9033 7.5166 26.9033 9.03418V9.71094H20.4609C20.4844 10.6484 20.7568 11.4072 21.2783 11.9873C21.8057 12.5615 22.4736 12.8486 23.2822 12.8486C23.8564 12.8486 24.3428 12.7314 24.7412 12.4971C25.1396 12.2627 25.4883 11.9521 25.7871 11.5654L26.7803 12.3389C25.9834 13.5635 24.7881 14.1758 23.1943 14.1758ZM22.9922 5.65039C22.3359 5.65039 21.7852 5.89062 21.3398 6.37109C20.8945 6.8457 20.6191 7.51367 20.5137 8.375H25.2773V8.25195C25.2305 7.42578 25.0078 6.78711 24.6094 6.33594C24.2109 5.87891 23.6719 5.65039 22.9922 5.65039ZM30.3311 4.49023L30.3838 5.68555C31.1104 4.77148 32.0596 4.31445 33.2314 4.31445C35.2412 4.31445 36.2549 5.44824 36.2725 7.71582V14H34.6465V7.70703C34.6406 7.02148 34.4824 6.51465 34.1719 6.18652C33.8672 5.8584 33.3896 5.69434 32.7393 5.69434C32.2119 5.69434 31.749 5.83496 31.3506 6.11621C30.9521 6.39746 30.6416 6.7666 30.4189 7.22363V14H28.793V4.49023H30.3311ZM40.9307 2.1875V4.49023H42.7061V5.74707H40.9307V11.6445C40.9307 12.0254 41.0098 12.3125 41.168 12.5059C41.3262 12.6934 41.5957 12.7871 41.9766 12.7871C42.1641 12.7871 42.4219 12.752 42.75 12.6816V14C42.3223 14.1172 41.9062 14.1758 41.502 14.1758C40.7754 14.1758 40.2275 13.9561 39.8584 13.5166C39.4893 13.0771 39.3047 12.4531 39.3047 11.6445V5.74707H37.5732V4.49023H39.3047V2.1875H40.9307ZM50.1504 11.4775C50.1504 11.0381 49.9834 10.6982 49.6494 10.458C49.3213 10.2119 48.7441 10.001 47.918 9.8252C47.0977 9.64941 46.4443 9.43848 45.958 9.19238C45.4775 8.94629 45.1201 8.65332 44.8857 8.31348C44.6572 7.97363 44.543 7.56934 44.543 7.10059C44.543 6.32129 44.8711 5.66211 45.5273 5.12305C46.1895 4.58398 47.0332 4.31445 48.0586 4.31445C49.1367 4.31445 50.0098 4.59277 50.6777 5.14941C51.3516 5.70605 51.6885 6.41797 51.6885 7.28516H50.0537C50.0537 6.83984 49.8633 6.45605 49.4824 6.13379C49.1074 5.81152 48.6328 5.65039 48.0586 5.65039C47.4668 5.65039 47.0039 5.7793 46.6699 6.03711C46.3359 6.29492 46.1689 6.63184 46.1689 7.04785C46.1689 7.44043 46.3242 7.73633 46.6348 7.93555C46.9453 8.13477 47.5049 8.3252 48.3135 8.50684C49.1279 8.68848 49.7871 8.90527 50.291 9.15723C50.7949 9.40918 51.167 9.71387 51.4072 10.0713C51.6533 10.4229 51.7764 10.8535 51.7764 11.3633C51.7764 12.2129 51.4365 12.8955 50.7568 13.4111C50.0771 13.9209 49.1953 14.1758 48.1113 14.1758C47.3496 14.1758 46.6758 14.041 46.0898 13.7715C45.5039 13.502 45.0439 13.127 44.71 12.6465C44.3818 12.1602 44.2178 11.6357 44.2178 11.0732H45.8438C45.873 11.6182 46.0898 12.0518 46.4941 12.374C46.9043 12.6904 47.4434 12.8486 48.1113 12.8486C48.7266 12.8486 49.2188 12.7256 49.5879 12.4795C49.9629 12.2275 50.1504 11.8936 50.1504 11.4775ZM60.5918 9.70215H62.3672V11.0293H60.5918V14H58.957V11.0293H53.1299V10.0713L58.8604 1.20312H60.5918V9.70215ZM54.9756 9.70215H58.957V3.42676L58.7637 3.77832L54.9756 9.70215ZM64.8018 14V5.74707H63.2988V4.49023H64.8018V3.51465C64.8018 2.49512 65.0742 1.70703 65.6191 1.15039C66.1641 0.59375 66.9346 0.31543 67.9307 0.31543C68.3057 0.31543 68.6777 0.365234 69.0469 0.464844L68.959 1.7832C68.6836 1.73047 68.3906 1.7041 68.0801 1.7041C67.5527 1.7041 67.1455 1.85938 66.8584 2.16992C66.5713 2.47461 66.4277 2.91406 66.4277 3.48828V4.49023H68.458V5.74707H66.4277V14H64.8018ZM74.8564 5.94922C74.6104 5.9082 74.3438 5.8877 74.0566 5.8877C72.9902 5.8877 72.2666 6.3418 71.8857 7.25V14H70.2598V4.49023H71.8418L71.8682 5.58887C72.4014 4.73926 73.1572 4.31445 74.1357 4.31445C74.4521 4.31445 74.6924 4.35547 74.8564 4.4375V5.94922ZM78.126 14H76.5V4.49023H78.126V14ZM76.3682 1.96777C76.3682 1.7041 76.4473 1.48145 76.6055 1.2998C76.7695 1.11816 77.0098 1.02734 77.3262 1.02734C77.6426 1.02734 77.8828 1.11816 78.0469 1.2998C78.2109 1.48145 78.293 1.7041 78.293 1.96777C78.293 2.23145 78.2109 2.45117 78.0469 2.62695C77.8828 2.80273 77.6426 2.89062 77.3262 2.89062C77.0098 2.89062 76.7695 2.80273 76.6055 2.62695C76.4473 2.45117 76.3682 2.23145 76.3682 1.96777ZM84.6826 14.1758C83.3936 14.1758 82.3447 13.7539 81.5361 12.9102C80.7275 12.0605 80.3232 10.9268 80.3232 9.50879V9.20996C80.3232 8.2666 80.502 7.42578 80.8594 6.6875C81.2227 5.94336 81.7266 5.36328 82.3711 4.94727C83.0215 4.52539 83.7246 4.31445 84.4805 4.31445C85.7168 4.31445 86.6777 4.72168 87.3633 5.53613C88.0488 6.35059 88.3916 7.5166 88.3916 9.03418V9.71094H81.9492C81.9727 10.6484 82.2451 11.4072 82.7666 11.9873C83.2939 12.5615 83.9619 12.8486 84.7705 12.8486C85.3447 12.8486 85.8311 12.7314 86.2295 12.4971C86.6279 12.2627 86.9766 11.9521 87.2754 11.5654L88.2686 12.3389C87.4717 13.5635 86.2764 14.1758 84.6826 14.1758ZM84.4805 5.65039C83.8242 5.65039 83.2734 5.89062 82.8281 6.37109C82.3828 6.8457 82.1074 7.51367 82.002 8.375H86.7656V8.25195C86.7188 7.42578 86.4961 6.78711 86.0977 6.33594C85.6992 5.87891 85.1602 5.65039 84.4805 5.65039ZM91.8193 4.49023L91.8721 5.68555C92.5986 4.77148 93.5479 4.31445 94.7197 4.31445C96.7295 4.31445 97.7432 5.44824 97.7607 7.71582V14H96.1348V7.70703C96.1289 7.02148 95.9707 6.51465 95.6602 6.18652C95.3555 5.8584 94.8779 5.69434 94.2275 5.69434C93.7002 5.69434 93.2373 5.83496 92.8389 6.11621C92.4404 6.39746 92.1299 6.7666 91.9072 7.22363V14H90.2812V4.49023H91.8193ZM99.8174 9.16602C99.8174 7.70703 100.163 6.53516 100.854 5.65039C101.546 4.75977 102.451 4.31445 103.57 4.31445C104.684 4.31445 105.565 4.69531 106.216 5.45703V0.5H107.842V14H106.348L106.269 12.9805C105.618 13.7773 104.713 14.1758 103.553 14.1758C102.451 14.1758 101.552 13.7246 100.854 12.8223C100.163 11.9199 99.8174 10.7422 99.8174 9.28906V9.16602ZM101.443 9.35059C101.443 10.4287 101.666 11.2725 102.111 11.8818C102.557 12.4912 103.172 12.7959 103.957 12.7959C104.988 12.7959 105.741 12.333 106.216 11.4072V7.03906C105.729 6.14258 104.982 5.69434 103.975 5.69434C103.178 5.69434 102.557 6.00195 102.111 6.61719C101.666 7.23242 101.443 8.14355 101.443 9.35059ZM115.91 11.4775C115.91 11.0381 115.743 10.6982 115.409 10.458C115.081 10.2119 114.504 10.001 113.678 9.8252C112.857 9.64941 112.204 9.43848 111.718 9.19238C111.237 8.94629 110.88 8.65332 110.646 8.31348C110.417 7.97363 110.303 7.56934 110.303 7.10059C110.303 6.32129 110.631 5.66211 111.287 5.12305C111.949 4.58398 112.793 4.31445 113.818 4.31445C114.896 4.31445 115.77 4.59277 116.438 5.14941C117.111 5.70605 117.448 6.41797 117.448 7.28516H115.813C115.813 6.83984 115.623 6.45605 115.242 6.13379C114.867 5.81152 114.393 5.65039 113.818 5.65039C113.227 5.65039 112.764 5.7793 112.43 6.03711C112.096 6.29492 111.929 6.63184 111.929 7.04785C111.929 7.44043 112.084 7.73633 112.395 7.93555C112.705 8.13477 113.265 8.3252 114.073 8.50684C114.888 8.68848 115.547 8.90527 116.051 9.15723C116.555 9.40918 116.927 9.71387 117.167 10.0713C117.413 10.4229 117.536 10.8535 117.536 11.3633C117.536 12.2129 117.196 12.8955 116.517 13.4111C115.837 13.9209 114.955 14.1758 113.871 14.1758C113.109 14.1758 112.436 14.041 111.85 13.7715C111.264 13.502 110.804 13.127 110.47 12.6465C110.142 12.1602 109.978 11.6357 109.978 11.0732H111.604C111.633 11.6182 111.85 12.0518 112.254 12.374C112.664 12.6904 113.203 12.8486 113.871 12.8486C114.486 12.8486 114.979 12.7256 115.348 12.4795C115.723 12.2275 115.91 11.8936 115.91 11.4775Z" />
            </svg>
            <div className='grow'></div>
            <button type="button" className={buttonClass} onClick={onMenuClick}>
              <span className="visually-hidden">Открыть меню</span>
            </button>
            <nav className={navClass}>
              <ul className={listClass} onClick={closeMenu}>{menuItems}</ul>
              <div className="overlay" onClick={closeMenu} />
            </nav>
          </div>
        </div>
        <h1 className="text-2xl md:text-6xl text-white text-bold pt-5 pb-7 md:pt-10 md:pb-14">
          Городские совместности в Калининграде
        </h1>
      </div>
    </header>
  );
};

export default Header;
