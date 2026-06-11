/* Garden Swap UI kit — sample data (fake, for the recreation) */

const GS_LISTINGS = [
  {
    id: 1, title: 'Monstera Deliciosa', status: 'swap', plantType: 'Houseplant',
    condition: 'Healthy', rarity: 'Rare', light: 'Partial Sun', size: 'Large',
    distance: '2.1 mi', lister: 'Priya', rating: 4.9,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&q=80',
    desc: 'Big, happy split-leaf Monstera. Pest-free. Looking to swap for a rare aroid or a Philodendron Pink Princess.',
  },
  {
    id: 2, title: 'Echeveria cuttings', status: 'free', plantType: 'Succulent',
    condition: 'Fresh Cutting', light: 'Full Sun', size: 'Small',
    distance: '0.8 mi', lister: 'Arjun', rating: 4.6,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80',
    desc: 'A whole tray of rosette cuttings, rooted and ready. Free to a good home — just bring a pot.',
  },
  {
    id: 3, title: 'Golden Pothos', status: 'swap', plantType: 'Cutting',
    condition: 'Healthy', light: 'Low Light', size: 'Medium',
    distance: '1.5 mi', lister: 'Meera', rating: 5.0,
    image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=600&q=80',
    desc: 'Fast-growing golden pothos vines. Trailing nicely. Will accept any trailing plant in return.',
  },
  {
    id: 4, title: 'Snake Plant pups', status: 'free', plantType: 'Houseplant',
    condition: 'Healthy', light: 'Low Light', size: 'Small',
    distance: '3.4 mi', lister: 'Kabir', rating: 4.7,
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b7c?w=600&q=80',
    desc: 'Several Sansevieria pups divided from the mother plant. Nearly unkillable — great for beginners.',
  },
  {
    id: 5, title: 'Basil & Mint seedlings', status: 'swap', plantType: 'Herb',
    condition: 'Healthy', light: 'Full Sun', size: 'Small',
    distance: '0.5 mi', lister: 'Ananya', rating: 4.8,
    image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=600&q=80',
    desc: 'Kitchen herb seedlings, started three weeks ago. Swapping for any vegetable starts.',
  },
  {
    id: 6, title: 'Tomato seeds (heirloom)', status: 'free', plantType: 'Seed',
    condition: 'Seed Packet', light: 'Full Sun', size: 'Small',
    distance: '4.0 mi', lister: 'Rohan', rating: 4.5,
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&q=80',
    desc: 'Saved heirloom tomato seeds from last season. Brandywine and Cherokee Purple. Packet of ~20.',
  },
];

const GS_CHATS = [
  {
    id: 11, listingTitle: 'Monstera Deliciosa', other: 'Priya', state: 'pending', swapType: 'trade',
    preview: 'Hi! I love your Monstera — would you take a Pink Princess cutting?',
    messages: [
      { mine: true, body: 'Hi! I love your Monstera — would you take a Pink Princess cutting?', time: '2:14 PM' },
    ],
  },
  {
    id: 12, listingTitle: 'Golden Pothos', other: 'Meera', state: 'accepted', swapType: 'trade',
    preview: 'Great — see you Saturday at the cafe!',
    messages: [
      { mine: false, sender: 'Meera', body: 'Yes, happy to swap for your spider plant!', time: 'Mon 5:01 PM' },
      { mine: true, body: 'Perfect. Can you do this weekend?', time: 'Mon 5:04 PM' },
      { mine: false, sender: 'Meera', body: 'Great — see you Saturday at the cafe!', time: 'Mon 5:06 PM' },
    ],
  },
  {
    id: 13, listingTitle: 'Snake Plant pups', other: 'Kabir', state: 'completed', swapType: 'giveaway',
    preview: 'Thanks so much, they look great!',
    messages: [
      { mine: false, sender: 'Kabir', body: 'All yours — picked up?', time: 'Last week' },
      { mine: true, body: 'Got them, thanks so much, they look great!', time: 'Last week' },
    ],
  },
];

const GS_WISHLIST = ['Pink Princess', 'String of Hearts', 'Variegated Monstera'];

Object.assign(window, { GS_LISTINGS, GS_CHATS, GS_WISHLIST });
