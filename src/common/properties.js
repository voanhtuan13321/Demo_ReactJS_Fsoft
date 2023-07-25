const link = {
  facebook: 'https://www.facebook.com',
  instagram: 'https://www.instagram.com/',
  linkedin: 'https://www.linkedin.com/',
};

const text = {
  logo: 'TuanVA28',
  email: 'voanhtuan13321@gmail.com',
  phone: '0332978426',
  address: '123 Lê Độ, Đà Nẵng',
};

const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

export { link, text, formatPrice };
