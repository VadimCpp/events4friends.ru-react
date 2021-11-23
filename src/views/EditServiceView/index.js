import React, { useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';

import ServiceForm from '../../components/ServiceForm';

const EditServiceView = () => {
  const { user } = useContext(AuthContext);
  const { editService, services } = useContext(DataContext);

  const saveHandler = useCallback(
    (service, cb) => {
      editService(service, service.id, cb);
    },
    [editService],
  );

  const routerParams = useParams();
  let service = { id: null };
  if (routerParams.id) {
    const filteredServices =
      services && services.filter(s => s.id === routerParams.id);
    if (services.length) {
      // eslint-disable-next-line prefer-destructuring
      service = filteredServices[0];
    }
  }

  return (
    <ServiceForm
      editMode
      isAuth={user && !user.isAnonymous}
      service={service}
      onSave={saveHandler}
    />
  );
};

export default EditServiceView;
