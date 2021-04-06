import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const tileData = [
    {
      img: '../../assets/images/dribbble.png',
      title: 'Breakfast',
      author: 'jill111',
      cols: 2,
      featured: true,
    },
    {
      img: '/static/images/grid-list/burgers.jpg',
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
      img: '/static/images/grid-list/honey.jpg',
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
    <GridList cellHeight={200} spacing={1} className="grid_list">
        {tileData.map((tile) => (
        <GridListTile key={tile.img} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
            title={tile.title}
            titlePosition="top"
            actionIcon={
                <IconButton aria-label={`star ${tile.title}`} className="icon">
                <StarBorderIcon />
                </IconButton>
            }
            actionPosition="left"
            className="titlebar"
            />
        </GridListTile>
        ))}
    </GridList>
  );
}
