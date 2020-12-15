const bootstrapApp = require('../../public/index');

module.exports = () => `
<script src="https://unpkg.com/jwt-decode@2.2.0/build/jwt-decode.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.5.0/qs.min.js"></script>
<script type="text/javascript">
  var bootstrapApp = ${bootstrapApp.toString()};
  bootstrapApp();
</script>
`;
