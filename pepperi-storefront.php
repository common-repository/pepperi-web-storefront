<?php
	/* 
		Plugin Name: Pepperi Open Web Storefront
		Description: Embed your Pepperi Web Storefront sales catalogs in your WordPress website.
		Version: 1.0.1
	*/

	add_action( 'wp_ajax_pepperi_storefront_plugin_init', 'pepperi_storefront_plugin_init' );
	add_action( 'wp_ajax_nopriv_pepperi_storefront_plugin_init', 'pepperi_storefront_plugin_init' );

	function pepperi_storefront_plugin_init(){
		$settings = get_option('pepperi-settings');

		$host = 'https://cpi.pepperi.com/Service1.svc/v1/';
		$email = $settings['field_1_1'];
		$password = $settings['field_1_2'];
		$catalogUid = $settings['field_1_3'];
			
		$data = array(
			'userName'=>$email,
			'password'=>$password	
		);			
		
		$options = array(
			'http' => array(
				'method'  => 'POST',
				'content' => json_encode( $data ),
				'header'=>  "Content-Type: application/json\r\n" .
							"Accept: application/json\r\n"
			)
		);

		$context  = stream_context_create( $options );
		$result = file_get_contents( $host . 'PostGenerateUserAccessToken', false, $context );
		$response = json_decode( $result );	
			
		$response->Host = $host;
		$response->CatalogUID = $catalogUid;

		echo  json_encode($response);
		die();
	}

	function pepperi_enqueue(){
		wp_register_style( 'pepperi-api', plugin_dir_url( __FILE__ ) . 'Styles/api.min.css', array(), 2);
		wp_register_style( 'pepperi-jquery-ui', plugin_dir_url( __FILE__ ) . 'Styles/jquery-ui.css', array(), 2);
		wp_register_style( 'pepperi-timepicker', plugin_dir_url( __FILE__ ) . 'Styles/jquery-ui-timepicker-addon.css', array('jquery-ui-core'), 2);

		wp_register_script( 'pepperi-timepicker', plugin_dir_url( __FILE__ ) . 'Scripts/jquery-ui-timepicker-addon.js', array('jquery', 'jquery-ui-core'), 2, true);
		wp_register_script( 'pepperi-api', plugin_dir_url( __FILE__ ) . 'Scripts/api.js', array('jquery', 'jquery-ui-core', 'pepperi-timepicker'), 2, true);
	}
	add_action( 'wp_enqueue_scripts', 'pepperi_enqueue' );
	add_action( 'wp_enqueue_scripts', 'pepperi_enqueue' );

	add_shortcode( 'pepperi_storefront', 'pepperi_storefront_function' );
	function pepperi_storefront_function($atts, $content){
		$settings = get_option('pepperi-settings');

		wp_enqueue_style( 'pepperi-api');
		wp_enqueue_style( 'pepperi-jquery-ui');
		wp_enqueue_style( 'pepperi-timepicker');

		wp_enqueue_script( 'pepperi-jquery-ui');
		wp_enqueue_script( 'pepperi-timepicker');
		wp_enqueue_script( 'pepperi-api');

		wp_register_script( 'pepperi-init', plugin_dir_url( __FILE__ ) . 'Scripts/init.js', array('jquery', 'jquery-ui-core', 'pepperi-timepicker', 'pepperi-api'), 4, true);

		$translation_array = array(
			'pepperi_admin' => admin_url( 'admin-ajax.php' ),
			'pepperi_title' => $settings['field_1_4']
		);
		wp_localize_script( 'pepperi-init', 'pepperi_settings', $translation_array );

		wp_enqueue_script( 'pepperi-init');
		
		$html = '
			<div class="thumbnails-view" style="display: none;">
	        <header>
	            <hgroup class="clearfix">
	                <h1 class="title"></h1>
	                <h2>Display <span id="spnItemsCount">0</span> Items</h2>
	                <div class="search-container" style="display: none;">
	                    <input id="txtSearch" type="text" placeholder="Search" />
	                    <span class="search-icon"></span>
	                </div>
	            </hgroup>
	        </header>
	        <main>
	            <aside>
	                <div id="dvMainCategory" style="display:none;">
	                    <h2>MAIN CATEGORY</h2>
	                    <ul></ul>
	                </div>
	                <div id="dvSmartSearch" style="display:none;">
	                    <h2>SMART SEARCH <a href="javascript:void(0);" class="clear" style="display:none;">Clear</a></h2>
	                    <ul></ul>
	                </div>
	            </aside>
	            <div class="thumbnails clearfix">
	                <ul class="ul-catalog"></ul>
	                <div class="not-found" style="display: none;">
	                    No Items Found
	                </div>
	            </div>
	        </main>
	        <div class="smart-search-menu" style="display: none;">
	            <div class="clearfix">
	                <a href="javascript:void(0);" class="done">Done</a>
	                <a href="javascript:void(0);" class="clear">Clear</a>
	            </div>
	            <ul></ul>
	        </div>
	    </div>

	    <div class="smart-search-extend" style="display: none;">
	        <ul>
	            <li>
	                <label>
	                    <input type="radio" name="rdbSmartSearch" class="smaller-than" checked="checked">
	                    Smaller Than
	                </label>
	                <input type="text" class="smaller-than" value="">
	            </li>
	            <li>
	                <label>
	                    <input type="radio" name="rdbSmartSearch" class="greater-than">
	                    Greater Than
	                </label>
	                <input type="text" class="greater-than" value="">
	            </li>
	            <li>
	                <label>
	                    <input type="radio" name="rdbSmartSearch" class="between">
	                    Between
	                </label>
	                <input type="text" class="between-start" value="">
	            </li>
	            <li>
	                <label>
	                    <input type="radio" name="rdbSmartSearch" style="visibility: hidden;">
	                    To
	                </label>
	                <input type="text" class="between-end" value="">
	            </li>
	        </ul>
	    </div>

	    <div class="powered-by">                 
	        <a href="https://www.pepperi.com/?attr=qmpzopnsfcus" target="_blank">  
		        <img src="'.plugin_dir_url( __FILE__ ) . 'Images/powered.png" alt="Powered by pepperi" />
		    </a>
	    </div>

	    <div class="smart-search-text" style="display: none;">
	        <ul>
	            <li>
	                <label>Text </label>
	                <input type="text" value="">                
	            </li>
	        </ul>
	    </div>

	    <div class="loader" style="display: none;">
	    </div>

		';

		return $html;
	}

	add_action( 'admin_menu', 'pepperi_my_admin_menu' );
	function pepperi_my_admin_menu() {
		add_options_page( __('Pepperi Storefront', 'textdomain' ), __('Pepperi Storefront', 'textdomain' ), 'manage_options', 'pepperi-storefront-settings', 'pepperi_my_options_page' );
	}
	add_action( 'admin_init', 'pepperi_my_admin_init' );

	function pepperi_my_admin_init() {
		register_setting( 'my-settings-group', 'pepperi-settings' );
		add_settings_section( 'section-1', __( 'Login Credentials', 'textdomain' ), 'pepperi_section_1_callback', 'pepperi-storefront' );

		add_settings_field( 'field-1-1', __( 'Email', 'textdomain' ), 'pepperi_field_1_1_callback', 'pepperi-storefront', 'section-1' );
		add_settings_field( 'field-1-2', __( 'Password', 'textdomain' ), 'pepperi_field_1_2_callback', 'pepperi-storefront', 'section-1' );
		add_settings_field( 'field-1-3', __( 'Catalog ID', 'textdomain' ), 'pepperi_field_1_3_callback', 'pepperi-storefront', 'section-1' );
		add_settings_field( 'field-1-4', __( 'Title', 'textdomain' ), 'pepperi_field_1_4_callback', 'pepperi-storefront', 'section-1' );
	}

	function pepperi_my_options_page() {
	?>
	<div class="wrap">
	  <h2><?php _e('Pepperi Storefront Settings', 'textdomain'); ?></h2>
	  <form action="options.php" method="POST">
	    <?php settings_fields('my-settings-group'); ?>
	    <?php do_settings_sections('pepperi-storefront'); ?>
	    <?php submit_button(); ?>
	  </form>
	</div>
	<?php }

	function pepperi_section_1_callback() {
		_e( 'Some help text regarding Section One goes here.', 'textdomain' );
	}

	function pepperi_field_1_1_callback() {

		$settings = (array) get_option( 'pepperi-settings' );
		$field = "field_1_1";
		$value = esc_attr( $settings[$field] );

		echo "<input type='email' name='pepperi-settings[$field]' value='$value' />";
	}

	function pepperi_field_1_2_callback() {

		$settings = (array) get_option( 'pepperi-settings' );
		$field = "field_1_2";
		$value = esc_attr( $settings[$field] );

		echo "<input type='password' name='pepperi-settings[$field]' value='$value' />";
	}

	function pepperi_field_1_3_callback() {

		$settings = (array) get_option( 'pepperi-settings' );
		$field = "field_1_3";
		$value = esc_attr( $settings[$field] );

		echo "<input type='text' name='pepperi-settings[$field]' value='$value' />";
	}

	function pepperi_field_1_4_callback() {

		$settings = (array) get_option( 'pepperi-settings' );
		$field = "field_1_4";
		$value = esc_attr( $settings[$field] );

		echo "<input type='text' name='pepperi-settings[$field]' value='$value' />";
	}

	function pepperi_my_settings_validate_and_sanitize( $input ) {

		$settings = (array) get_option( 'pepperi-settings' );

		if ( $some_condition == $input['field_1_1'] ) {
			$output['field_1_1'] = $input['field_1_1'];
		} else {
			add_settings_error( 'pepperi-settings', 'invalid-field_1_1', 'You have entered an invalid value into Field One.' );
		}

		if ( $some_condition == $input['field_1_2'] ) {
			$output['field_1_2'] = $input['field_1_2'];
		} else {
			add_settings_error( 'pepperi-settings', 'invalid-field_1_2', 'You have entered an invalid value into Field One.' );
		}

		return $output;
	}