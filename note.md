Wednesday 4/5/2016
- download handlebar.js put it to js folder
- include handlebars in html head    <script src="handlebars.js"></script>
- <script id="item-template" type="text/x-handlebars-template">
    <div>
      <h2>{{title}}</h1>
      <p>{{year}}</p>
    </div>
  </script>
- var template = $('#item-template').html();
- var templateFunction = Handlebars.compile(template);
- templateFunction({title: 'jaws', year: '1990'});
- output after call templateFunction: "
    <div>
      <h2>jaws</h1>
      <p>1990</p>
    </div>
  "


