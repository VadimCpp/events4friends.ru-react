import React from 'react';
import { withRouter } from 'react-router-dom';
import ButtonLink from '../../components/ButtonLink';
import StoreBadge from '../../components/StoreBadge';
import CommunityList from '../../components/CommunityList';
import './CommunitiesView.css';
import communities from './communities.json';

const CommunitiesView = () => (
  <div className="communitiesview">
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
      <CommunityList communities={communities} />
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
