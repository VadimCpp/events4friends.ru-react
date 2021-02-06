import React from 'react';
import { withRouter } from 'react-router-dom';
import ButtonLink from '../../components/ButtonLink';
import ButtonExternalLink from '../../components/ButtonExternalLink';
import StoreBadge from '../../components/StoreBadge';
import './CommunitiesView.css';

const CommunitiesView = () => (
  <div>
    <div>
      <ButtonLink
        to="/"
        icon="/icons/icon_arrow_back.svg"
        title="На главную"
        className="communities-view__button-link"
      />
    </div>
    <div className="border-top mt-3">
      <p className="mt-3">Все сообщества Калининграда</p>
      <div className="container container-center mt-2">
        <ButtonExternalLink
          href="https://invite.viber.com/?g2=AQB3E%2BjqSG%2B%2F9Uui8NoBuwBJtIg4H%2F7Mb1RtXXmz1VW8WmCXCXQDkeP5kgzpOdBx"
          icon="/icons/viber.svg"
          alt="telegram"
          title="МТВ Трещалка"
          classList={['cv__button-external-link', 'mtv']}
        />
      </div>
      <div className="container container-center">
        <ButtonExternalLink
          href="tg://resolve?domain=veloafishagroup"
          icon="/icons/telegram.svg"
          alt="telegram"
          title="ВелоАфиша Чат"
          classList={['cv__button-external-link', 'telegram']}
        />
      </div>
      <div className="container container-center">
        <ButtonExternalLink
          href="https://vk.com/velocherepashki039"
          icon="/icons/vk.svg"
          alt="vk"
          title="Велочерепашки"
          className="cv__button-external-link"
        />
      </div>
      <div className="container container-center">
        <ButtonExternalLink
          href="https://vk.com/club195226782"
          icon="/icons/vk.svg"
          alt="vk"
          title="MTB LOVE"
          className="cv__button-external-link"
        />
      </div>
      <div className="container container-center">
        <ButtonExternalLink
          href="https://vk.com/velozapad"
          icon="/icons/vk.svg"
          alt="vk"
          title="Велозапад"
          className="cv__button-external-link"
        />
      </div>
      <div className="container container-center">
        <ButtonExternalLink
          href="https://vk.com/velosreda39"
          icon="/icons/vk.svg"
          alt="vk"
          title="Велосреда"
          className="cv__button-external-link"
        />
      </div>
      <div className="container container-center">
        <ButtonExternalLink
          href="https://vk.com/club195213043"
          icon="/icons/vk.svg"
          alt="vk"
          title="ВелоЧерепашки-39 Дети"
          className="cv__button-external-link"
        />
      </div>
      <div className="container container-center">
        <ButtonExternalLink
          href="tg://resolve?domain=OpenRoad39"
          icon="/icons/telegram.svg"
          alt="telegram"
          title="OpenRoad39"
          classList={['cv__button-external-link', 'telegram']}
        />
      </div>
      <div className="container container-center pb-4">
        <ButtonExternalLink
          href="https://vk.com/amberman39"
          icon="/icons/vk.svg"
          alt="vk"
          title="AMBERMAN ТРИАТЛОН"
          className="cv__button-external-link"
        />
      </div>
    </div>
    <div className="border-top mt-3 mb-3">
      <p className="mt-3">
        Для добавления Вашего чата или группы сообщества, напишите пожалуйста
        программисту ВКонтакте:
        <br />
        <a href="https://vk.com/vadimcpp">Вадим Канинский</a>
      </p>
    </div>
    <div className="border-top">
      <div className="container container-center pt-4 pb-5">
        <p>Наше мобильное приложение:</p>
        <div className="d-flex justify-content-center">
          <div className="mr-1">
            <StoreBadge platform="ios" width={120} />
          </div>
          <div className="ml-1">
            <StoreBadge platform="android" width={120} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withRouter(CommunitiesView);
