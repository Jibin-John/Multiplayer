class Game{
  constructor(){

   this.container;
   this.camera;
   this.renderer;
   this.controls;
   this.scene;
   this.model;
   this.assetsPath = 'assets';
   this.modelName='/';
   this.models=['claire.fbx','idle.fbx','john.fbx'];
   //var x = this.models[0];
   this.container = document.querySelector('#scene-container');
   //this.container.style.height = '100%';
   //document.body.appendChild(this.container);
   const game = this;
   this.clock = new THREE.Clock();
   this.init();

  }
  init()
  {
    this.camera = new THREE.PerspectiveCamera(45,this.container.clientWidth/this.container.clientHeight,1,2000);
    this.camera.position.set(0,200,600);
    this.scene = new THREE.Scene();
    this.scene.background= new THREE.Color('#4d4940');

		let light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
		light.position.set( 0, 200, 0 );
		this.scene.add( light );

		light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 0, 200, 100 );
		light.castShadow = true;
		light.shadow.camera.top = 180;
		light.shadow.camera.bottom = -100;
		light.shadow.camera.left = -120;
		light.shadow.camera.right = 120;
		this.scene.add( light );
    const game=this;
    var x = game.models[1];
    console.log(x);
    this.createMesh();    
    this.renderCam();
    //this.loadModel();
    this.animate();
   

  }
  changeModel(clicked)//clicked get the id from html call
  {
    const game=this;
    //console.log(clicked);
    game.assetsPath="assets";
    game.str='/'
    if(clicked==1)
    {
      game.modelName = game.str.concat(game.models[0]);
    }                                                                 //Loading the model based on button id 
    else if(clicked == 2)
    {
      game.modelName = game.str.concat(game.models[1]);
    }
    else if(clicked == 3)
    {
      game.modelName = game.str.concat(game.models[2]);
    }
    
    game.assetsPath = game.assetsPath.concat(game.modelName);
    console.log(game.assetsPath);
    this.removeModel();
    this.loadModel();
  }
  removeModel()
  {
    console.log(this.model);
    this.scene.remove(this.model);
  }

  createMesh()
  {
    // ground
		var mesh = new THREE.Mesh( new THREE.CircleGeometry( 100, 50 ), new THREE.MeshPhongMaterial( 
      { 
        color: '#c0c736', 
        depthWrite: false
       } ) );
		mesh.rotation.x = - Math.PI / 2;
		//mesh.position.y = -100;
		mesh.receiveShadow = true;
		this.scene.add( mesh );

		/*var grid = new THREE.GridHelper( 500, 40, 0x000000, 0x000000 );
		grid.position.y = -100;
		grid.material.opacity = 0.2;
		grid.material.transparent = true;
    this.scene.add( grid );   */
  }

  loadModel()
  {
    
    const loader = new THREE.FBXLoader();
    const game=this;
    //game.assetsPath = game.assetsPath.concat(game.modelName);
    //console.log(game.assetsPath);
    loader.load( `${this.assetsPath}`, function ( object ) {
    console.log(object);
    game.model = object;
    console.log(game.model);
    object.traverse( function ( child ) {

      if ( child.isMesh ) {

        child.castShadow = true;
        child.receiveShadow = true;

      }
     
    } );
    game.scene.add(object);
    });
    
  }


  //This script is for rendering the scene
  renderCam()
  {
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
		this.renderer.shadowMap.enabled = true;
    this.container.appendChild( this.renderer.domElement ); 
    this.controls= new THREE.OrbitControls(this.camera,this.renderer.domElement);
    this.controls.minDistance=10;
    this.controls.maxDistance = 700;
    this.controls.update();
  }

  animate()
  {
    const game = this;
    requestAnimationFrame(function(){game.animate();});
    game.renderer.render(this.scene,this.camera);
  }
}