function trim(str)
{
 return str.replace(/^[\s\xA0]+/, '').replace(/[\s\xA0]+$/, '').replace(/ +$/, '').replace(/^ +/, '');
}

function isEmail(email)
{
 var pattern = /^[-._A-Za-z0-9]{1,}@[-._A-Za-z0-9]{1,}\.[A-Za-z]{2,4}$/;
 return pattern.test(email);
}

function isPhone(phone)
{
 var pattern = /^([+])?[0-9\s\(\)-]{10,}$/;
 return pattern.test(phone);
}

function ajax_add4Compare(itemId, onlyAdd, state, compare_place)
{
 compare_place = !compare_place ? 'catalog' : compare_place;
 var ajax = new Ajax('/ajax/ajax_compare.php');
 ajax.addParam('itemId', itemId);
 ajax.addParam('onlyAdd', onlyAdd);
 ajax.addParam('state', state);
 ajax.addParam('compare_place', compare_place);
 ajax.run();
}

function compareItems()
{
 box = document.getElementsByName('compareID');
 for(i=0,k=box.length;i<k;i++)
 {
  if(box[i].checked)
  {
   ajax_add4Compare(box[i].value, 1, true);
  }
 }
 window.open ("/compare","statuswin","menubar=0,location=1,scrollbars=1,resizable=1,top=170,left=100");
}

function ajax_add2Order(itemId, price)
{
 var ajax = new Ajax('/ajax/ajax_order.php');
 ajax.addParam('op', 'order');
 ajax.addParam('itemId', itemId);
 ajax.addParam('price', price);
 ajax.run();
}

function ajax_setVote(voteId, questionId)
{
 var ajax = new Ajax('/ajax/ajax_vote.php');
 ajax.addParam('voteId', voteId);
 ajax.addParam('questionId', questionId);
 ajax.run();
}

function Ajax(url)
{
 this.url = url;
 this.method = 'POST';
 this.getXmlHttp = function() {
 var xmlhttp;
  //try { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP.5.0"); } catch (e) {
  // try { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP.4.0"); } catch (e2) {
  //  try { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e3) {
     try { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e4) {
      try { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e5) {xmlhttp = false;}} //}}}
  if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {xmlhttp = new XMLHttpRequest();}
  return xmlhttp;
 }
 this.xmlhttp = this.getXmlHttp();
 this.params = 'ajax_key=1';
 this.addParam = function(name, value) {this.params += '&' + name + '=' + value;}
 this.run = function(){
  var xmlhttp = this.xmlhttp;
  xmlhttp.open(this.method, this.url, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //xmlhttp.setRequestHeader("Connection", "close");
  //xmlhttp.setRequestHeader("Content-length", this.params.length);
  xmlhttp.onreadystatechange = function() { if (xmlhttp.readyState == 4  && xmlhttp.status == 200) {eval(xmlhttp.responseText);}}
  xmlhttp.send(this.params);
 }
}

function plural(n, words)
{
 var plural=(n%10==1 && n%100!=11) ? 0 : ((n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20)) ? 1 : 2);
 return words[plural];
}

function number_format (number, decimals, dec_point, thousands_sep) {
  // http://kevin.vanzonneveld.net
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +     bugfix by: Michael White (http://getsprink.com)
  // +     bugfix by: Benjamin Lupton
  // +     bugfix by: Allan Jensen (http://www.winternet.no)
  // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +     bugfix by: Howard Yeend
  // +    revised by: Luke Smith (http://lucassmith.name)
  // +     bugfix by: Diogo Resende
  // +     bugfix by: Rival
  // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
  // +   improved by: davook
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Jay Klehr
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Amir Habibi (http://www.residence-mixte.com/)
  // +     bugfix by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // +      input by: Amirouche
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: number_format(1234.56);
  // *     returns 1: '1,235'
  // *     example 2: number_format(1234.56, 2, ',', ' ');
  // *     returns 2: '1 234,56'
  // *     example 3: number_format(1234.5678, 2, '.', '');
  // *     returns 3: '1234.57'
  // *     example 4: number_format(67, 2, ',', '.');
  // *     returns 4: '67,00'
  // *     example 5: number_format(1000);
  // *     returns 5: '1,000'
  // *     example 6: number_format(67.311, 2);
  // *     returns 6: '67.31'
  // *     example 7: number_format(1000.55, 1);
  // *     returns 7: '1,000.6'
  // *     example 8: number_format(67000, 5, ',', '.');
  // *     returns 8: '67.000,00000'
  // *     example 9: number_format(0.9, 0);
  // *     returns 9: '1'
  // *    example 10: number_format('1.20', 2);
  // *    returns 10: '1.20'
  // *    example 11: number_format('1.20', 4);
  // *    returns 11: '1.2000'
  // *    example 12: number_format('1.2000', 3);
  // *    returns 12: '1.200'
  // *    example 13: number_format('1 000,50', 2, '.', ' ');
  // *    returns 13: '100 050.00'
  // Strip all characters but numerical ones.
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}