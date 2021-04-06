import React from 'react';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';

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
      img: robinhood,
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
  ];

export default function Navigation() {
  return (
    <div className="grid_list">
        {tileData.map((tile) => (
            <div className="aspectRatio_container">
                <div className={tile.featured ? "navigation_tile" : "navigation_tile_small"}>
                    {tile.featured && (
                        <div className="navigation_tab_header">
                            Portfolio | Robinhood
                        </div>
                    )}
                    <img className="navigation_image" src={tile.img} alt={tile.title} />
                </div>
            </div>
        ))}
    </div>
  );
}
