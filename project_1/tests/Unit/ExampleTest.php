<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @test
     */
    public function can_add_an_artwork()
    {
               //Given
                      //User is authenticated
               //When
               $response =this->json('POST','/api/products',[

               ]);
                      //post request create product
               //Then
                     //product exists
                     $response->assertStatus(201);
    }
}
