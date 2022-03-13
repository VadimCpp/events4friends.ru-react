import React, { useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { DataContext } from '../../context/DataContext';
import Spinner from '../../components/Spinner';
import { NOTICES } from '../../enums';
import './CommunitiesView.css';

const CommunitiesView = ({ setCommunity, currentCommunity }) => {
  const history = useHistory();
  const { communities: communitiesList } = useContext(DataContext);

  const onCommunityClick = useCallback(
    (evt, communityId) => {
      evt.preventDefault();
      // Cookies
      const cookies = new Cookies();
      cookies.set('communityId', communityId);
      const aCommunity = communitiesList.find(c => c.id === communityId);
      if (currentCommunity && currentCommunity !== aCommunity) {
        setCommunity(aCommunity);
      }
      if (history.location.pathname !== '/') {
        history.push('/');
      }
    },
    [history, setCommunity, currentCommunity, communitiesList],
  );

  return (
    <section id="communities" className="communities">
      <div className="communities__wrapper">
        <h2 className="communities__title">Сообщества</h2>
        {communitiesList.length === 0 && <Spinner message={NOTICES.LOADING} />}
        <ul className="communities__list">
          {communitiesList.map(community => (
            <li className="community" key={community.id}>
              <a
                className="community__wrapper"
                onClick={evt => onCommunityClick(evt, community.id)}
                href="/"
              >
                <h3 className="community__title">{community.name}</h3>
                <img
                  className="community__img"
                  src={community.logo_url}
                  width="95"
                  height="95"
                  alt=""
                />
                <p className="community__text">{community.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CommunitiesView;
