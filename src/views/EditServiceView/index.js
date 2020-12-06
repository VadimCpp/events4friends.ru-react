import React, { useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';

import ServiceForm from '../../components/ServiceForm';

const EditServiceView = () => {
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const routerParams = useParams();
  const isAuth = authContext.user && !authContext.user.isAnonymous;

  const saveHandler = useCallback(
    (service, cb) => {
      dataContext.editService(service, service.id, cb);
    },
    [dataContext],
  );

  let service = { id: null };
  if (routerParams.id) {
    // IE 11, если не поддерживать можно использовать Array.find
    const services =
      dataContext.services &&
      dataContext.services.filter(s => s.id === routerParams.id);
    if (services.length) {
      // eslint-disable-next-line prefer-destructuring
      service = services[0];
    }
  }

  return (
    <ServiceForm
      editMode
      isAuth={isAuth}
      service={service}
      onSave={saveHandler}
    />
  );
};

export default EditServiceView;
