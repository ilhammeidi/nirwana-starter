/**
 * @name Filter
 * @function filter product list base on category, price, tag, etc
 * @function sort product list by name or price
 */

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
  })
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
      <figure><img src=${img} alt=${title}></figure>
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
  //  console.log(filterVal);
  //  console.log(products);
  var items = filterResult();
  $('#result_length').text(items.length);
  $('#product_result').html('');
  for (i=0; i<items.length; i++) {
    $('#product_result').append(productCard(items[i].rating, items[i].price, 'https://source.unsplash.com/random', items[i].title, 'Category: '+items[i].category+' ~ '+'Tag: '+items[i].tag+' ~ '+'Check: '+items[i].check+' ~ '+'Radio: '+items[i].radio, 'round', 'portrait', '/detail-product'))
  }
}

// category filter
$('#filter_category li a').click(function() {
  var val = $(this).data('value');

  $('#filter_category li a').removeClass('active');
  $(this).addClass('active');

  filterVal.category = val;
  renderResult();
});

// rating filter
$('#filter_rating li a').click(function() {
  var val = $(this).data('value');

  $('#filter_rating li a').removeClass('active');
  $(this).addClass('active');

  filterVal.rating = Number(val);
  renderResult();
});

// category radio
$('#filter_radio li input[type="radio"]').click(function() {
  var val = $(this).val();
  $('#filter_radio li').removeClass('active');
  $(this).parents('.collection-item').addClass('active');

  filterVal.radio = val;
  renderResult();
});

// category checkbox
$('#filter_check li input[type="checkbox"]').click(function() {
  var val = $(this).val();

  $('#filter_check li').removeClass('active');
  $(this).parents('.collection-item').addClass('active');

  if($(this).is(':checked')) {
    filterVal.check.push(val)
  } else {
    removeArray(filterVal.check, val);
  }
  renderResult();
});

// select all categories
$('#select_all_categories').click(function(){
  filterVal.check = checkAll;
  $('#filter_check input[type="checkbox"]').prop('checked', true);
  renderResult();
});

// category tags
$('#filter_tags .btn-tag input[type="checkbox"]').click(function() {
  var val = $(this).val();
  if($(this).is(':checked')) {
    filterVal.tags.push(val)
  } else {
    removeArray(filterVal.tags, val);
  }
  renderResult();
});

// price filter
$('#filter_price button').click(function() {
  filterVal.range.from = Number($('#price_from').val());
  filterVal.range.to = Number($('#price_to').val());
  renderResult();
});