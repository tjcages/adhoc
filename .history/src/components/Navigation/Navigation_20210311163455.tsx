import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import robinhood from '../../assets/images/robinhood.png'
import dribbble from '../../assets/images/dribbble.png'

const tileData = [
    {
      img: robinhood,
      title: 'Breakfast',
      author: 'jill111',
      cols: 2,
      featured: true,
    },
    {
      img: dribbble,
      title: 'Tasty burger',
      author: 'director90',
    },
    {
      img: '/static/images/grid-list/camera.jpg',
      title: 'Camera',
      author: 'Danson67',
    },
    {
      img: '/static/images/grid-list/morning.jpg',
      title: 'Morning',
      author: 'fancycrave1',
      featured: true,
    },
    {
      img: '/static/images/grid-list/hats.jpg',
      title: 'Hats',
      author: 'Hans',
    },
    {
      img: '../../assets/images/dribbble.png',
      title: 'Honey',
      author: 'fancycravel',
    },
    {
      img: '/static/images/grid-list/vegetables.jpg',
      title: 'Vegetables',
      author: 'jill111',
      cols: 2,
    },
    {
      img: '/static/images/grid-list/plant.jpg',
      title: 'Water plant',
      author: 'BkrmadtyaKarki',
    },
    {
      img: '/static/images/grid-list/mushroom.jpg',
      title: 'Mushrooms',
      author: 'PublicDomainPictures',
    },
    {
      img: '/static/images/grid-list/olive.jpg',
      title: 'Olive oil',
      author: 'congerdesign',
    },
    {
      img: '/static/images/grid-list/star.jpg',
      title: 'Sea star',
      cols: 2,
      author: '821292',
    },
    {
      img: '/static/images/grid-list/bike.jpg',
      title: 'Bike',
      author: 'danfador',
    },
  ];

export default function Navigation() {
  return (
    <GridList cellHeight={150} spacing={1} className="grid_list">
        {tileData.map((tile) => (
        <GridListTile key={tile.img} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
            <div className="navigation_tile">
                <img className="navigation_image" src={tile.img} alt={tile.title} />
            </div>
        </GridListTile>
        ))}
    </GridList>
  );
}
