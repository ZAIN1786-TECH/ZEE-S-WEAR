const localImages = [
  '/Images/Classic  denim jacket.jpeg',
  '/Images/Casual Summer Shirt.jpg',
  '/Images/Casual Chino Pants.webp',
  '/Images/Premium Leather Jacket.jpg',
  '/Images/Silver Necklace.webp',
  '/Images/Designer Handbag.jpg',
  '/Images/Urban Street Hoodie.jpg',
  '/Images/Business Formal Suit.jpg',
  '/Images/Elegant Evening Gown1.webp',
  '/Images/Summer Floral Dress.webp',
  '/Images/Winter Wool Coat.jpg',
  '/Images/Casual Jumpsuit.jpg',
  '/Images/Sporty Track Pants.webp',
  '/Images/Premium Watch.webp',
  '/Images/Laptop Bag1.jpg',
  '/Images/Designer Sunglasses.avif',
  '/Images/Designer Scarf.avif',
  '/Images/Designer Heels.webp',
  '/Images/Winter Beanie.jpg',
  '/Images/Sports Cap.jpg',
];

export const getLocalImage = (index) => {
  // Return a local image based on the index (modulo to loop if we have more products than images)
  return localImages[index % localImages.length];
};
