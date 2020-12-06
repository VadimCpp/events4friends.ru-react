import React, { useContext, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';

import ServiceFormView from '../../components/ServiceForm';

const NewServiceView = () => {
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const isAuth = authContext.user && !authContext.user.isAnonymous;

  const saveHandler = useCallback(
    (service, cb) => {
      dataContext.createService(service, cb);
    },
    [dataContext],
  );

  const service = {
    name: authContext.user && authContext.user.displayName,
    contact: authContext.user && authContext.user.email,
  };

  return (
    <ServiceFormView service={service} isAuth={isAuth} onSave={saveHandler} />
  );
};

export default NewServiceView;
