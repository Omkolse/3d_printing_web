
export const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role; // 'customer' or 'owner'
  } catch (error) {
    return null;
  }
};

export const isAdmin = () => {
  return getUserRole() === 'owner';
};

export const isCustomer = () => {
  return getUserRole() === 'customer';
};