function suggestStreet(event, text, city_id, city_base)
{
 if(document.getElementById('deliveryType3') && document.getElementById('deliveryType3').checked) return false;

        if (window.event) event = window.event;
        var code = event.keyCode ? event.keyCode : event.which ? event.which : null;
        select = document.getElementById('suggestSelect');

 if(city_id!=city_base)
 {
  if(select)
  {
   select.style.visibility='hidden';
  }
  document.getElementById('deliveryStreet').className = 'wide b';
  return false;
 }

 if(trim(text).length <= 2)
 {
  if(select)
  {
   //select.style.display = 'none';
   select.style.visibility='hidden';
   document.getElementById('deliveryStreet').className = 'wide b';
  }
  return false;
 }

 if(select && select.options.length==1 && trim(text)==select.options[0].text)
 {
  //select.style.display = 'none';
  select.style.visibility='hidden';
  return false;
 }

        if (code == 13 || code == 9)
         return false;

 if (code == 40)//нажали вниз
        {
         //select.style.display = 'block';
         select.style.visibility='visible';
  select.focus();
  select.options[0].selected = true;
  return false;
 }
 var ajax = new Ajax('/ajax/ajax_tools.php');
 ajax.addParam('op', 'suggestStreet');
 ajax.addParam('text', text);
 ajax.addParam('city_id', city_id);
 ajax.run();
}

function listenSelectKey(event, obj)
{
        if (window.event) event = window.event;
        var code = event.keyCode ? event.keyCode : event.which ? event.which : null;
        objPole = document.getElementById('deliveryStreet')
 if (code == 38 && obj.options[0].selected==true)//нажали вверх
        {
         objPole.focus();
         obj.style.visibility='hidden';
         //obj.style.display = 'none';
 }
 if (code == 13 || code == 9)//нажали ввод
        {
         objPole.value = obj.options[obj.selectedIndex].text;
         //obj.style.display = 'none';
         obj.style.visibility='hidden';
         objPole.focus();
         return false;
 }
}

function setValue(obj)
{
 objPole = document.getElementById('deliveryStreet');
 selectedValue = obj.options[obj.selectedIndex].text;
 obj.style.visibility='hidden';
 objPole.value = selectedValue;
 objPole.focus();
 //obj.style.display = 'none';
 return false;
}


function suggestCityRF(event, text, index)
{   index = index?index:'';
        if (window.event) event = window.event;
        var code = event.keyCode ? event.keyCode : event.which ? event.which : null;
        select = document.getElementById('suggestCity'+index);

 if(trim(text).length <= 2)
 {
  if(select)
  {
   //select.style.display = 'none';
   select.style.visibility='hidden';
   document.getElementById('deliveryCityRF'+index).className = 'wide b';
  }
  return false;
 }

 if(select && select.options.length==1 && trim(text)==select.options[0].text)
 {
  //select.style.display = 'none';
  select.style.visibility='hidden';
  return false;
 }

        if (code == 13 || code == 9)
         return false;

 if (code == 40)//нажали вниз
        {
         //select.style.display = 'block';
         select.style.visibility='visible';
  select.focus();
  select.options[0].selected = true;
  return false;
 }
 var ajax = new Ajax('/ajax/ajax_tools.php');
 ajax.addParam('op', 'suggestCityRF');
 ajax.addParam('text', text);
 ajax.addParam('index', index);
 ajax.run();
}


function listenSelectKeyRF(event, obj, index)
{  index = index?index:'';
        if (window.event) event = window.event;
        var code = event.keyCode ? event.keyCode : event.which ? event.which : null;
        objPole = document.getElementById('deliveryCityRF'+index)
 if (code == 38 && obj.options[0].selected==true)//нажали вверх
        {
         objPole.focus();
         obj.style.visibility='hidden';
         //obj.style.display = 'none';
 }
 if (code == 13 || code == 9)//нажали ввод
        {
         objPole.value = obj.options[obj.selectedIndex].text;
         //obj.style.display = 'none';
         obj.style.visibility='hidden';
         objPole.focus();
         return false;
 }
}

function setValueRF(obj,index)
{ index = index?index:'';
 objPole = document.getElementById('deliveryCityRF'+index);
 selectedValue = obj.options[obj.selectedIndex].text;
 obj.style.visibility='hidden';
 objPole.value = selectedValue;
 objPole.focus();
 //obj.style.display = 'none';
 return false;
}