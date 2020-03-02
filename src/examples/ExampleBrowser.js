import React from 'react';
import { NavLink } from 'react-router-dom';
import ExampleViewer from './ExampleViewer';

import SimpleExample from './Simple/index';
import GeometriesExample from './Geometries/index';
import GeometryShapesExample from './GeometryShapes/index';

import Mafia from './mafia/index';

const examples = [
  {
    name: 'Simple',
    component: SimpleExample,
    url: 'Simple/index',
    slug: 'webgl_simple',
  },
  {
    name: 'Geometries',
    component: GeometriesExample,
    url: 'Geometries/index',
    slug: 'webgl_geometries',
  },
  {
    name: 'Geometry Shapes',
    component: GeometryShapesExample,
    url: 'GeometryShapes/index',
    slug: 'webgl_geometry_shapes',
  },
  {
    separator: true,
    name: 'Games',
  },
  {
    name: 'Mafia',
    component: Mafia,
    url: 'mafia/index',
    slug: 'games_mafia',
  },
];

const ExampleBrowser = ({ match }) => {
  const { params } = match;
  const activeExample = params.slug && examples.find(example => example.slug === params.slug);
  return (
    <div>
      <div id="panel" className="collapsed">
        <h1><a href="https://github.com/SwineStudios/OMG/">OMG</a> / demos</h1>
        <div id="content">
          <div>
            <h2>webgl</h2>
            {examples.map((example, index) => {
              if (example.separator) {
                return (<h2 key={index}>{example.name}</h2>);
              }

              return (<NavLink
                to={`/${example.slug}`}
                key={index}
                className="link"
                activeClassName="selected"
              >
                {example.name}
              </NavLink>);
            })}
          </div>
        </div>
      </div>
      <ExampleViewer example={activeExample} />
    </div>
  );
};

ExampleBrowser.propTypes = {
  match: React.PropTypes.object.isRequired,
};

export default ExampleBrowser;
