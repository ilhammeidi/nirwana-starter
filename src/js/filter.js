/**
 * @name Filter
 * @function filter product list base on category, price, tag, etc
 * @function sort product list by name or price
 * @function switch view grid or list
 */

// switch view
$('#switch_view button').click(function() {
  $('#switch_view button').removeClass('active');
  $(this).addClass('active');

  var view = $(this).data('value');
  if(view === 'grid') {
    $('#product_result > .col').addClass('col-lg-4').removeClass('col-sm-12');
    $('#product_result .product-card').addClass('portrait').removeClass('landscape');
  } else {
    $('#product_result > .col').addClass('col-sm-12').removeClass('col-lg-4');
    $('#product_result .product-card').addClass('landscape').removeClass('portrait');
  }
});

// collect values
function removeArray(arr) {
  var what, a = arguments, L = a.length, ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax= arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}

var checkAll = [
  'check-a',
  'check-b',
  'check-c',
  'check-d',
  'check-e',
  'check-f'
];

var filterVal = {
  category: 'all',
  rating: 0,
  radio: 'all',
  check: checkAll,
  range: {
    from: 0,
    to: 100
  },
  tags: ['tag-one', 'tag-two', 'tag-three', 'tag-four']
};

var sortVal = {
  sortBy: 'price',
  sortfrom: -1,
  sortTo: 1
}

function intersection(firstArray, secondArray) {
  return firstArray.filter(function(element) {
    return secondArray.includes(element);
  })
}

function checkFilter(item, filterData){
  if (filterData !== 'all') {
    return item === filterData;
  }
  return true;
}

// Get filtered data list
function filterResult() {
  var cardItems = $('#product_result').data('items');

  return cardItems.filter(function(cardItem) {
    return (
      checkFilter(cardItem.category, filterVal.category) &&
      checkFilter(cardItem.radio, filterVal.radio) &&
      cardItem.price >= filterVal.range.from &&
      cardItem.price <= filterVal.range.to &&
      cardItem.rating >= filterVal.rating &&
      filterVal.check.indexOf(cardItem.check) > -1 &&
      intersection(filterVal.tags, cardItem.tag).length > 0
    )
  }).sort(function(a, b) {
    return a[sortVal.sortBy] > b[sortVal.sortBy] ? sortVal.sortFrom : sortVal.sortTo
  });
}

// HTML Template
function productCard(rating = 0, price = 0, img, title, desc, type = 'full', orientation = 'portrait', href = '#') {
  var star = '<i class="material-icons star-icon" title="1">star</i>';
  var start_disable = '<i class="material-icons star-icon-disable" title="1">star</i>';

  function renderStar(rating) {
    return star.repeat(rating) + start_disable.repeat(5 - rating)
  }

  var $item = `<div class="col col-sm-4">
    <div class="card product-card portrait ${type}">
      <a class="waves-effect hidden-link" href=${href}>&nbsp;</a>
      <div class="figure">
        <div class="responsive-img" style="background-image:url(${img})">&nbsp;</div>
      </div>
      <div class="desc">
        <div class="text">
          <h6 class="title pb-2 text-truncate">${title}</h6>
          <p class="use-text-paragraph">${desc}</p>
        </div>
        <div>
          <div class="property">
            <div class="rating">
              ${renderStar(rating)}
            </div>
            <strong>$${price}</strong>
          </div>
          <a class="btn btn-outlined primary button block" href=${href}>see detail</a>
        </div>
      </div>
    </div>
  </div>`

  return $item;
}

// Render filtered list to HTML
function renderResult() {
  var items = filterResult();
  $('#result_length').text(items.length);
  $('#product_result').html('');
  for (i=0; i<items.length; i++) {
    $('#product_result').append(productCard(items[i].rating, items[i].price, items[i].img, items[i].title, 'Category: '+items[i].category+' ~ '+'Tag: '+items[i].tag+' ~ '+'Check: '+items[i].check+' ~ '+'Radio: '+items[i].radio, 'round', 'portrait', '/detail-product'))
  }
}

// sort filter
$('#sort_by').change(function(e){
  var val = e.target.value;
  switch (val) {
    case 'title-asc':
      sortVal.sortBy = 'title'
      sortVal.sortFrom = 1
      sortVal.sortTo = -1
      break
    case 'title-desc':
      sortVal.sortBy = 'title'
      sortVal.sortFrom = -1
      sortVal.sortTo = 1
      break
    case 'price-asc':
      sortVal.sortBy = 'price'
      sortVal.sortFrom = -1
      sortVal.sortTo = 1
      break
    default:
      sortVal.sortBy = 'price'
      sortVal.sortFrom = 1
      sortVal.sortTo = -1
  }
  renderResult();
});

// category filter
$('.filter_category li a').click(function() {
  var val = $(this).data('value');

  $('.filter_category li a').removeClass('active');
  $(this).addClass('active');

  filterVal.category = val;
  renderResult();
});

// rating filter
$('.filter_rating li a').click(function() {
  var val = $(this).data('value');

  $('.filter_rating li a').removeClass('active');
  $(this).addClass('active');

  filterVal.rating = Number(val);
  renderResult();
});

// category radio
$('.filter_radio li input[type="radio"]').click(function() {
  var val = $(this).val();
  $('.filter_radio li').removeClass('active');
  $(this).parents('.collection-item').addClass('active');

  filterVal.radio = val;
  renderResult();
});

// category checkbox
$('.filter_check li input[type="checkbox"]').click(function() {
  var val = $(this).val();

  $('.filter_check li').removeClass('active');
  $(this).parents('.collection-item').addClass('active');

  if($(this).is(':checked')) {
    filterVal.check.push(val)
  } else {
    removeArray(filterVal.check, val);
  }
  renderResult();
});

// select all categories
$('.select_all_categories').click(function(){
  filterVal.check = checkAll;
  $('.filter_check input[type="checkbox"]').prop('checked', true);
  renderResult();
});

// category tags
$('.filter_tags .btn-tag input[type="checkbox"]').click(function() {
  var val = $(this).val();
  if($(this).is(':checked')) {
    filterVal.tags.push(val)
  } else {
    removeArray(filterVal.tags, val);
  }
  renderResult();
});

// price filter
$('.filter_price button').click(function() {
  filterVal.range.from = Number($('#price_from').val());
  filterVal.range.to = Number($('#price_to').val());
  renderResult();
});


// handle mobile filter
$(function() {
  $('#modal_filter.modal').modal({
    onOpenStart: function() {
      var filter_sidebar = $('#filter_sidebar > aside');
      filter_sidebar.detach();
      $('#filter_mobile').append(filter_sidebar);
    },
    onCloseEnd: function() {
      var filter_mobile = $('#filter_mobile > aside');
      filter_mobile.detach();
      $('#filter_sidebar').append(filter_mobile);
    }
  });
});