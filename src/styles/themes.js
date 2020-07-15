
const common = {
    
    color_active: '#00B9FF'
    ,color_neutral: '#888888'
    
    ,color_error: '#c86765'
    ,COLOR_error: '#fac7c6'
    
    ,color_success: '#4c906b'
    ,COLOR_success: '#dbf2d6'
    
    ,color_warning: '#eabe5c'
    ,COLOR_warning: '#ffedbe'
    
    ,color_tip: '#2688b2'
    ,COLOR_tip: '#caebfb'
    
    
    ,media: {
        
        small_mid: 420 // 
        ,mid_big: 920 // 120 + 400 * 2
    }
    
}



const themes =  {

    light: {
    
        ...common,
        
        name: "light",
        
        color_strong: '#000000',
        color_normal: '#222222',
        color_weak: '#777777',
        color_very_weak: '#cccccc',
        
        COLOR_bg: '#f0f0f9',
        
        COLOR_normal: '#f8f8f8'
        
    },

    dark: {
    
        ...common,
        
        name: "dark",
        
        color_strong: '#ffffff',
        color_normal: '#dddddd',
        color_weak: '#888888',
        color_very_weak: '#333333',
        
        COLOR_bg: '#000000',
        
        COLOR_normal: '#191920'
    
    }
    
}

export default themes