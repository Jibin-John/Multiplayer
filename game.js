class Game{
  constructor(){

   this.container;
   this.camera;
   this.renderer;
   this.controlsl;
   this.scene;

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
    this.camera.position.set(112,100,400);
    this.scene = new THREE.Scene();
    this.scene.background= new THREE.Color('0xa0a0a0');

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
    
     // ground
		var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 4000, 4000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
		mesh.rotation.x = - Math.PI / 2;
		//mesh.position.y = -100;
		mesh.receiveShadow = true;
		this.scene.add( mesh );

		var grid = new THREE.GridHelper( 4000, 40, 0x000000, 0x000000 );
		//grid.position.y = -100;
		grid.material.opacity = 0.2;
		grid.material.transparent = true;
		this.scene.add( grid );   
    
    game.renderCam();
    game.render();
    game.loadModel();

  }

  //This script is for rendering the scene
  renderCam()
  {
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
		this.renderer.shadowMap.enabled = true;
		this.container.appendChild( this.renderer.domElement );
  }

  render()
  {
    const game = this;
    this.renderer.render(this.scene,this.camera);
  }

  //Here is the script for loading my 3D object
  loadModel()
  {
    const game = this;
    game.loader = new THREE.FBXLoader();
    game.loader.load('../assets/boy.fbx',function(object){
      game.mixer = new THREE.AnimationMixer(object);
      game.action = game.mixer.clipAction(object.animations[0]);
      game.action.play();

      object.traverse(function (child)
      {
        if(child.isMesh){
          child.castShadow = true;
          child.receieveShadow = true;
        }
      });
    });

  }
}
