var smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
var settings = {
  outputStyle: 'less', /* less || scss || sass || styl */
  columns: 24, /* number of grid columns */
  offset: '12px', /* gutter width px || % */
  mobileFirst: true, /* mobileFirst ? 'min-width' : 'max-width' */
  container: {
    maxWidth: '1420px', /* max-width оn very large screen */
    fields: '20px' /* side fields */
  },
  breakPoints: {
    lg: {
      width: '1100px', /* -> @media (max-width: 1100px) */
    },
    md: {
      width: '960px'
    },
    sm: {
      width: '780px',
      offset: '12px'/* set fields only if you want to change container.fields */
    },
    xs: {
      width: '560px',
      fields: '5px',
      offset: '6px'
    },
    xxs: {
      width: '200px',
      fields: '5px',
      offset: '3px'
    }
    /*
    We can create any quantity of break points.

    some_name: {
        width: 'Npx',
        fields: 'N(px|%|rem)',
        offset: 'N(px|%|rem)'
    }
    */
  }
};

smartgrid('./src/less', settings);
