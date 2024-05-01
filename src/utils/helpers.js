export const trimAddress = (address) => {
  return address.slice(0, 5) + "..." + address.slice(address.length - 5);
};
export const trimDescription = (description) => {
  if (description.length > 12) {
    return description.slice(0, 12) + "...";
  } else {
    return description;
  }
};

export const trimTitle = (title) => {
  if (title.length > 10) {
    return title.slice(0, 10) + "...";
  } else {
    return title;
  }
};
