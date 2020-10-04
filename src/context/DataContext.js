import React from 'react';

const defaultData = {
	events: [],
	services: [],
	config: {},
};

export const DataContext = React.createContext(defaultData);
