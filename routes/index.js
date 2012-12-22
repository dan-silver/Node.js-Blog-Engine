
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express', posts: [
  {title: 'First Post', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mauris risus, aliquet sed porta auctor, consectetur sit amet sem. Vivamus eget sem libero, at fringilla lorem. Duis eu faucibus dui. Vivamus ullamcorper purus sed libero tempor euismod. Proin adipiscing eros sed dolor porta placerat. Maecenas vitae pharetra neque. Pellentesque scelerisque convallis elit vitae viverra. Vivamus laoreet quam a justo imperdiet et aliquam dui ultrices. Nunc sed nisi urna. Phasellus egestas, justo sit amet mollis ultricies, leo ipsum ultricies est, quis porta felis est ut tortor.'}, 
   {title: 'Second Post', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mauris risus, aliquet sed porta auctor, consectetur sit amet sem. Vivamus eget sem libero, at fringilla lorem. Duis eu faucibus dui. Vivamus ullamcorper purus sed libero tempor euismod. Proin adipiscing eros sed dolor porta placerat. Maecenas vitae pharetra neque. Pellentesque scelerisque convallis elit vitae viverra. Vivamus laoreet quam a justo imperdiet et aliquam dui ultrices. Nunc sed nisi urna. Phasellus egestas, justo sit amet mollis ultricies, leo ipsum ultricies est, quis porta felis est ut tortor.'},
   {title: 'Third Post', content: '<b>Lorem ipsum</b> dolor sit amet, consectetur adipiscing elit. Praesent mauris risus, aliquet sed porta auctor, consectetur sit amet sem. Vivamus eget sem libero, at fringilla lorem. Duis eu faucibus dui. Vivamus ullamcorper purus sed libero tempor euismod. Proin adipiscing eros sed dolor porta placerat. Maecenas vitae pharetra neque. Pellentesque scelerisque convallis elit vitae viverra. Vivamus laoreet quam a justo imperdiet et aliquam dui ultrices. Nunc sed nisi urna. Phasellus egestas, justo sit amet mollis ultricies, leo ipsum ultricies est, quis porta felis est ut tortor.'}
   ]});
};