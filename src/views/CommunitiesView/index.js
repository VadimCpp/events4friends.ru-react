import React, { useContext, useCallback, useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import ButtonLink from '../../components/ButtonLink';
import StoreBadge from '../../components/StoreBadge';
import { DataContext } from '../../context/DataContext';
import Spinner from '../../components/Spinner';
import { NOTICES } from '../../enums';
import './CommunitiesView.css';

const CommunitiesView = () => {
  const history = useHistory();
  const { communities: communitiesList } = useContext(DataContext);

  const onCommunityClick = useCallback(
    communityId => {
      // Cookies
      const cookies = new Cookies();
      cookies.set('communityId', communityId);
      history.push('/');
    },
    [history],
  );

  const [isBackButton, setIsBackButton] = useState(false);
  useEffect(() => {
    // Cookies
    const cookies = new Cookies();
    const communityId = cookies.get('communityId');
    setIsBackButton(Boolean(communityId));
  }, []);

  return (
    <div className="communitiesview">
      {isBackButton && (
        <ButtonLink
          to="/"
          icon="/icons/icon_arrow_back.svg"
          title="На главную"
          className="btn-back"
        />
      )}
      <div className={isBackButton ? 'border-top mt-3 mb-3' : 'mt-3 mb-3'}>
        <p className="mt-3">Выберите сообщество</p>
        {communitiesList.map(community => (
          <div key={community.id} className="pb-3">
            <button
              type="button"
              className="btn-community"
              onClick={() => onCommunityClick(community.id)}
            >
              {!!community.logo_url && (
                <img
                  src={community.logo_url}
                  alt="Logo"
                  width="32"
                  height="32"
                />
              )}
              <span className="pl-2">{community.name}</span>
            </button>
          </div>
        ))}
        {communitiesList.length === 0 && <Spinner message={NOTICES.LOADING} />}
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
};

export default withRouter(CommunitiesView);
