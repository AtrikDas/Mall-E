
import React, { Component, createRef } from "react";


export const navigationRef = createRef();
// const navigation = useNavigation();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}