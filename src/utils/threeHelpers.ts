import * as THREE from 'three'

export function createAdvancedParticleSystem(scene: THREE.Scene, count: number = 200) {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const velocities = new Float32Array(count * 3)
  const phases = new Float32Array(count)

  // Forest green color palette with more variations
  const forestColors = [
    new THREE.Color(0x90EE90), // Light green
    new THREE.Color(0x32CD32), // Lime green
    new THREE.Color(0x228B22), // Forest green
    new THREE.Color(0x006400), // Dark green
    new THREE.Color(0x98FB98), // Pale green
    new THREE.Color(0x00FF7F), // Spring green
  ]

  for (let i = 0; i < count; i++) {
    const i3 = i * 3

    // Spherical distribution for more natural look
    const radius = Math.random() * 25 + 5
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = radius * Math.cos(phi)

    // Varying velocities for organic movement
    velocities[i3] = (Math.random() - 0.5) * 0.02
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.02
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.02

    // Random colors and sizes
    const color = forestColors[Math.floor(Math.random() * forestColors.length)]
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b

    sizes[i] = Math.random() * 0.05 + 0.02
    phases[i] = Math.random() * Math.PI * 2
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  // Advanced particle shader material
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
    },
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      uniform float time;
      uniform float pixelRatio;
      
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        
        // Pulsing effect
        float pulse = sin(time * 2.0 + position.x * 0.1) * 0.5 + 1.0;
        gl_PointSize = size * 300.0 * pixelRatio * pulse / -mvPosition.z;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      
      void main() {
        // Create circular particles with soft edges
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        
        if (dist > 0.5) discard;
        
        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
        alpha *= 0.8;
        
        // Add some sparkle effect
        float sparkle = sin(dist * 20.0) * 0.1 + 0.9;
        
        gl_FragColor = vec4(vColor * sparkle, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })

  const particles = new THREE.Points(geometry, material)
  scene.add(particles)

  // Store additional data for animation
  particles.userData = {
    velocities,
    phases,
    originalPositions: positions.slice()
  }

  return particles
}

export function createMorphingSphere(radius: number = 1, color: number = 0x32CD32) {
  const geometry = new THREE.SphereGeometry(radius, 64, 64)
  
  // Store original positions for morphing
  const positionAttribute = geometry.getAttribute('position')
  const originalPositions = positionAttribute.array.slice()
  
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(color) },
      mousePosition: { value: new THREE.Vector2(0, 0) }
    },
    vertexShader: `
      uniform float time;
      uniform vec2 mousePosition;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vDisplacement;
      
      // Noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        
        // Create morphing displacement
        float noise1 = snoise(position * 2.0 + time * 0.5);
        float noise2 = snoise(position * 4.0 + time * 0.3);
        float displacement = noise1 * 0.3 + noise2 * 0.1;
        
        // Mouse interaction
        float mouseInfluence = length(mousePosition) * 0.5;
        displacement += mouseInfluence * sin(time * 3.0) * 0.2;
        
        vDisplacement = displacement;
        
        vec3 newPosition = position + normal * displacement;
        vPosition = newPosition;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vDisplacement;
      
      void main() {
        // Dynamic color based on displacement
        vec3 dynamicColor = color + vDisplacement * 0.5;
        
        // Fresnel effect
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - dot(vNormal, viewDirection), 2.0);
        
        // Pulsing effect
        float pulse = sin(time * 2.0) * 0.1 + 0.9;
        
        // Final color with energy effect
        vec3 finalColor = dynamicColor * pulse;
        finalColor += fresnel * vec3(0.3, 0.8, 0.3);
        
        float alpha = 0.8 + fresnel * 0.2;
        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide
  })

  const sphere = new THREE.Mesh(geometry, material)
  sphere.userData = { originalPositions }
  
  return sphere
}

export function createWireframeGeometry(type: 'cube' | 'sphere' | 'torus' = 'cube') {
  let geometry: THREE.BufferGeometry

  switch (type) {
    case 'sphere':
      geometry = new THREE.SphereGeometry(1, 16, 16)
      break
    case 'torus':
      geometry = new THREE.TorusGeometry(1, 0.3, 8, 16)
      break
    default:
      geometry = new THREE.BoxGeometry(1, 1, 1)
  }

  const material = new THREE.MeshBasicMaterial({
    color: 0x32CD32,
    wireframe: true,
    transparent: true,
    opacity: 0.6
  })

  return new THREE.Mesh(geometry, material)
}

export function animateFloat(mesh: THREE.Mesh, amplitude: number = 0.5, speed: number = 1) {
  const initialY = mesh.position.y
  
  return (time: number) => {
    mesh.position.y = initialY + Math.sin(time * speed) * amplitude
  }
}

export function animateRotation(mesh: THREE.Mesh, speed: THREE.Vector3 = new THREE.Vector3(0.01, 0.01, 0)) {
  return () => {
    mesh.rotation.x += speed.x
    mesh.rotation.y += speed.y
    mesh.rotation.z += speed.z
  }
}

export function createDynamicBackground(scene: THREE.Scene) {
  // Create animated background plane with shader
  const geometry = new THREE.PlaneGeometry(100, 100, 100, 100)
  
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    },
    vertexShader: `
      uniform float time;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        
        // Create wave displacement
        vec3 pos = position;
        pos.z += sin(pos.x * 0.1 + time) * 0.5;
        pos.z += cos(pos.y * 0.1 + time * 0.7) * 0.3;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec2 resolution;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vec2 uv = vUv;
        
        // Create flowing patterns
        float pattern1 = sin(uv.x * 10.0 + time * 0.5) * cos(uv.y * 8.0 + time * 0.3);
        float pattern2 = sin(uv.x * 15.0 - time * 0.4) * sin(uv.y * 12.0 + time * 0.6);
        
        // Combine patterns
        float combined = pattern1 * 0.3 + pattern2 * 0.2;
        
        // Forest green gradient
        vec3 color1 = vec3(0.1, 0.2, 0.1);
        vec3 color2 = vec3(0.05, 0.15, 0.05);
        vec3 color3 = vec3(0.2, 0.4, 0.2);
        
        vec3 finalColor = mix(color1, color2, combined);
        finalColor = mix(finalColor, color3, sin(time * 0.2) * 0.1 + 0.1);
        
        gl_FragColor = vec4(finalColor, 0.3);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide
  })

  const backgroundPlane = new THREE.Mesh(geometry, material)
  backgroundPlane.position.z = -20
  backgroundPlane.rotation.x = -Math.PI / 4
  scene.add(backgroundPlane)

  return backgroundPlane
}

export function createFloatingOrbs(scene: THREE.Scene, count: number = 8) {
  const orbs: THREE.Mesh[] = []
  
  for (let i = 0; i < count; i++) {
    const radius = Math.random() * 0.5 + 0.3
    const geometry = new THREE.SphereGeometry(radius, 32, 32)
    
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color().setHSL(0.3 + Math.random() * 0.1, 0.7, 0.5) }
      },
      vertexShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          
          // Subtle pulsing
          vec3 pos = position * (1.0 + sin(time * 2.0) * 0.05);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - dot(vNormal, viewDirection), 3.0);
          
          vec3 finalColor = color + fresnel * 0.5;
          float alpha = 0.6 + fresnel * 0.4;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    })
    
    const orb = new THREE.Mesh(geometry, material)
    
    // Random position in 3D space
    const angle = (i / count) * Math.PI * 2
    const radius3D = 8 + Math.random() * 5
    orb.position.set(
      Math.cos(angle) * radius3D + (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 8,
      Math.sin(angle) * radius3D + (Math.random() - 0.5) * 4
    )
    
    orb.userData = {
      originalPosition: orb.position.clone(),
      floatSpeed: Math.random() * 0.02 + 0.01,
      rotationSpeed: (Math.random() - 0.5) * 0.02
    }
    
    scene.add(orb)
    orbs.push(orb)
  }
  
  return orbs
}

export function createEnergyField(scene: THREE.Scene) {
  const geometry = new THREE.BufferGeometry()
  const lineCount = 50
  const points = []
  
  for (let i = 0; i < lineCount; i++) {
    const angle = (i / lineCount) * Math.PI * 2
    const radius = 15
    
    // Create spiral lines
    for (let j = 0; j < 100; j++) {
      const t = j / 100
      const spiralRadius = radius * (1 - t * 0.3)
      const height = (t - 0.5) * 20
      
      points.push(new THREE.Vector3(
        Math.cos(angle + t * Math.PI * 4) * spiralRadius,
        height,
        Math.sin(angle + t * Math.PI * 4) * spiralRadius
      ))
    }
  }
  
  geometry.setFromPoints(points)
  
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 }
    },
    vertexShader: `
      uniform float time;
      attribute vec3 position;
      
      void main() {
        vec3 pos = position;
        
        // Animated flow effect
        float wave = sin(pos.y * 0.1 + time * 2.0) * 0.5;
        pos.x += wave;
        pos.z += wave * 0.5;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      
      void main() {
        float alpha = sin(time * 3.0) * 0.3 + 0.4;
        gl_FragColor = vec4(0.2, 0.8, 0.3, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending
  })
  
  const energyField = new THREE.Line(geometry, material)
  scene.add(energyField)
  
  return energyField
}

export function updateAdvancedParticles(particles: THREE.Points, time: number, mousePosition: THREE.Vector2) {
  if (!particles.userData.velocities) return
  
  const positions = particles.geometry.getAttribute('position')
  const { velocities, phases, originalPositions } = particles.userData
  
  for (let i = 0; i < positions.count; i++) {
    const i3 = i * 3
    
    // Organic movement with mouse interaction
    const mouseInfluence = 1 / (1 + mousePosition.length() * 0.1)
    const wave = Math.sin(time * 0.5 + phases[i]) * 0.5
    
    positions.array[i3] = originalPositions[i3] + 
      Math.sin(time * 0.3 + i * 0.1) * 2 * mouseInfluence + 
      velocities[i3] * time * 10
    
    positions.array[i3 + 1] = originalPositions[i3 + 1] + 
      wave * 3 + 
      velocities[i3 + 1] * time * 10
    
    positions.array[i3 + 2] = originalPositions[i3 + 2] + 
      Math.cos(time * 0.4 + i * 0.05) * 1.5 * mouseInfluence + 
      velocities[i3 + 2] * time * 10
  }
  
  positions.needsUpdate = true
  
  // Update shader uniforms
  if (particles.material instanceof THREE.ShaderMaterial) {
    particles.material.uniforms.time.value = time
  }
}
